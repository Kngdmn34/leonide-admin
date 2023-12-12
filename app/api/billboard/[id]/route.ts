import prisma from '@/app/lib/prismadb'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, { params}: {params: {id: string}}){ 
    try  {

        const { id } = params
        const dltProduct = await prisma.billboard.delete({
            where: { 
                id
            }
        })
        return NextResponse.json({dltProduct}, {status: 200})
    }
catch(e){
    return new NextResponse('error')
}
}