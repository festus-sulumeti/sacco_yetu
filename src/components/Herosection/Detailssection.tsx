import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react'
import saaco from '../../assets/5.png'


export default function FeaturesSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl"> Built for Scaling SACCOs in Kenya</h2>
                            <p className="mt-6">   Sacco Yetu is a modern digital SACCO platform designed to empower individuals and groups across Kenya.  
                                 We simplify saving, lending, and financial growth — helping communities achieve more together.  
                                 <span className="block mt-2 font-medium italic">
                                    Jengesha elimu pesa — advancing financial literacy and prosperity.
                                 </span>
                            </p>
                        </div>
                        <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
                            <li>
                                <Mail className="size-5" />
                                24/7 Email and Web Support
                            </li>
                            <li>
                                <Zap className="size-5" />
                                Fast and Reliable Response Time
                            </li>
                            <li>
                                <Activity className="size-5" />
                                Real-time Monitoring and Analytics
                            </li>
                            <li>
                                <DraftingCompass className="size-5" />
                                 Smart Financial Architecture and Review
                            </li>
                        </ul>
                    </div>
                    <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <img src={ saaco } className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1207} height={929} />
                            <img src= { saaco } className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1207} height={929} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}