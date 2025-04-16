import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, Link } from "lucide-react";
import Image from "next/image";
import React from "react";

function Main() {
  return (
    <div>
     <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-emerald-50 to-white">
                     <div className="container px-4 md:px-6">
                         <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                             <div className="flex flex-col justify-center space-y-4">
                                 <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700 w-fit">
                                     Smart Finance Management
                                 </div>
                                 <div className="space-y-2">
                                     <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                         Take Control of Your Finances with AI-Powered Insights
                                     </h1>
                                     <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                         Track expenses in real-time, receive smart notifications, and get personalized motivation to achieve
                                         your financial goals.
                                     </p>
                                 </div>
                                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <a href="/signup">
                                    <Button className="bg-emerald-900 hover:bg-emerald-700">
                                         
                                         Start for Free
                                         <ChevronRight className="ml-2 h-4 w-4" />
                                    
                                 </Button>
                                 </a>
                                    
                                 </div>
                                 <div className="flex items-center gap-4 text-sm">
                                     <div className="flex items-center gap-1">
                                         <CheckCircle className="h-4 w-4 text-emerald-500" />
                                         <span>No credit card required</span>
                                     </div>
                                    
                                 </div>
                             </div>
                             <div className="flex items-center justify-center">
                                 <div className="relative w-full max-w-[500px] overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                                     <Image
                                         src="/savings.gif"
                                         width={800}
                                         height={600}
                                         alt="Animation showing expense tracking and analytics"
                                         className="rounded-lg"
                                     />
                                 </div>
                             </div>
                         </div>
                     </div>
                 </section>
    </div>
  );
}

export default Main;
