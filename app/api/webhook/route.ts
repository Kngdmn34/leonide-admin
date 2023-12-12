import Stripe from "stripe";
import { headers} from 'next/headers'

import { NextResponse } from "next/server";
import prisma from '@/app/lib/prismadb'

export async function POST( req: Request) { 
    
    const body = await req.text()

    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try { 
        event = Stripe.webhooks.constructEvent(
body,
signature,
process.env.STRIPE_WEBHOOK_SECRET!
        )
    }
    catch(error: any) { 
        return new NextResponse('Webhook error',{status:400})


    }

    const session  = event.data.object as Stripe.Checkout.Session;
    const customer = session?.customer_details?.name
    const address = session?.customer_details?.address;

    const addresscomponents  = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,

    ];

    const addressString = addresscomponents.filter((c) => c !== null).join(', ')

    if(event.type === "checkout.session.completed") { 
        const order = await prisma.order.update({
            where: { 
                id: session?.metadata?.orderId,
            },
            data: { 
                customerName: customer || undefined,
isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || '',

            },
            include: { 
                orderItems: true
            }
        })

        const productIds = order.orderItems.map((orderItem) => orderItem.productId );
        
        await prisma.product.updateMany({
            where: { 
                id: { 
                    in: [...productIds]
                }
            },
           data: { 
            isFeatured: true
           }
        })
    }

    return new NextResponse(null, {status: 200})

}