import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransactions } from "../../../components/p2pTransactions"; 

async function getp2pTransactions(){
    const session=await getServerSession(authOptions);
    const userId=Number(session?.user?.id);

    if(!userId){
        return [];
    }
    const txns= await prisma.p2pTransfer.findMany({
        where:{
            OR:[
                {fromUserId:userId},
                {toUserId:userId}
            ]
        },
        include:{
            fromUser:{
                select:{
                    number:true
                }
            },
            toUser:{
                select:{
                    number:true
                }
            }
        },
        orderBy:{
            timestamp:"desc"
        }
    }
    )
        return txns.map(t=>{
           
            const isSent=t.fromUserId === userId;
            return {
                time:t.timestamp,
                amount:t.amount,
                type: isSent?"sent" as const : "received" as const,
                phoneNumber: isSent ? t.toUser.number : t.fromUser.number 
            }

        })
}
export default async function() {
    const transactions=await getp2pTransactions();

    return <div>
         <div className="w-screen">
               <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                   Transactions P2P
               </div>
               <div className="w-[900px] flex-justify-center">
                <P2PTransactions transactions={transactions}></P2PTransactions>
               </div>
               
           </div>
    </div>
}