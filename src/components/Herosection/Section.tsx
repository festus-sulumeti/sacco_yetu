
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import image from '../../assets/4.png'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <img
                    className="rounded-(--radius) grayscale"
                    src={image}
                    alt="team image"
                    height=""
                    width=""
                    loading="lazy"
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">Empower Your Future: The Sacco Yetu Ecosystem is Here.</h2>
                    <div className="space-y-6">
                          <p>Sacco Yetu is the digital engine for your financial well-being. More than just a simple application, we are building a complete ecosystem—a powerful platform and API suite that delivers **smarter financing solutions** directly to Kenyans. We enable SACCO members, developers, and businesses across the nation to innovate and access better opportunities for growth.</p>
                           
                           <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link to="#">
                                <span>Learn More</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
