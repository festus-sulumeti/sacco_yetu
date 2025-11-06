import { useState } from 'react'
import {
    BanknoteIcon,
    CalendarIcon,
    ChartBarIcon,
    CreditCardIcon,
    DollarSignIcon,
    HandCoinsIcon,
    HomeIcon,
    PlusIcon,
    SettingsIcon,
    TrendingUpIcon,
    UsersIcon,
    WalletIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar'

import ProfileDropdown from '@/components/dropdown-profile'


const ApplicationShell = () => {
    // state to show payment panel and the URL to render
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
    const openPaymentPanel = (url: string) => setPaymentUrl(url)
    const closePaymentPanel = () => setPaymentUrl(null)

    return (
        <div className='flex min-h-dvh w-full'>
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <HomeIcon />
                                                <span>Dashboard</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Chama Management</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <UsersIcon />
                                                <span>My Chamas</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <PlusIcon />
                                                <span>Create Chama</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <HandCoinsIcon />
                                                <span>Join Chama</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Financial</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <DollarSignIcon />
                                                <span>Contributions</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <CreditCardIcon />
                                                <span>Loans</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <BanknoteIcon />
                                                <span>Loan Repayments</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            {/* open in-dashboard payment panel instead of navigating away */}
                                            <button
                                                onClick={() => openPaymentPanel('https://payments.example.com/checkout/txn_sample')}
                                                className='flex items-center gap-2'
                                            >
                                                <WalletIcon />
                                                <span>Pending Payments</span>
                                            </button>
                                        </SidebarMenuButton>
                                        <SidebarMenuBadge className='bg-primary/10 rounded-full'>3</SidebarMenuBadge>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Reports & Analytics</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <ChartBarIcon />
                                                <span>Financial Reports</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <TrendingUpIcon />
                                                <span>Growth Analytics</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <CalendarIcon />
                                                <span>Payment Schedule</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Settings</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href='#'>
                                                <SettingsIcon />
                                                <span>Profile Settings</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <div className='flex flex-1 flex-col'>
                    <header className='bg-card sticky top-0 z-50 border-b'>
                        <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
                            <div className='flex items-center gap-4'>
                                <SidebarTrigger className='[&_svg]:!size-5' />
                                <Separator orientation='vertical' className='hidden !h-4 sm:block' />
                                <Breadcrumb className='hidden sm:block'>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Free</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className='flex items-center gap-1.5'>

                                <ProfileDropdown
                                    trigger={
                                        <Button variant='ghost' size='icon' className='size-9.5'>
                                            <Avatar className='size-9.5 rounded-md'>
                                                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </header>
                    <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
                        <div className='space-y-6'>
                            {/* Welcome Section */}
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h1 className='text-3xl font-bold tracking-tight'>Welcome back!</h1>
                                    <p className='text-muted-foreground'>Manage your chamas and track your financial progress.</p>
                                </div>
                                <Button>
                                    <PlusIcon className='mr-2 h-4 w-4' />
                                    Create New Chama
                                </Button>
                            </div>

                            {/* Stats Cards */}
                            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                                <Card>
                                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                        <CardTitle className='text-sm font-medium'>Total Chamas</CardTitle>
                                        <UsersIcon className='h-4 w-4 text-muted-foreground' />
                                    </CardHeader>
                                    <CardContent>
                                        <div className='text-2xl font-bold'>3</div>
                                        <p className='text-xs text-muted-foreground'>+1 from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                        <CardTitle className='text-sm font-medium'>Total Contributions</CardTitle>
                                        <DollarSignIcon className='h-4 w-4 text-muted-foreground' />
                                    </CardHeader>
                                    <CardContent>
                                        <div className='text-2xl font-bold'>KSh 45,231</div>
                                        <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                        <CardTitle className='text-sm font-medium'>Active Loans</CardTitle>
                                        <CreditCardIcon className='h-4 w-4 text-muted-foreground' />
                                    </CardHeader>
                                    <CardContent>
                                        <div className='text-2xl font-bold'>2</div>
                                        <p className='text-xs text-muted-foreground'>KSh 12,000 outstanding</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                        <CardTitle className='text-sm font-medium'>Pending Payments</CardTitle>
                                        <WalletIcon className='h-4 w-4 text-muted-foreground' />
                                    </CardHeader>
                                    <CardContent>
                                        <div className='text-2xl font-bold'>3</div>
                                        <p className='text-xs text-muted-foreground'>KSh 5,000 total</p>
                                        {/* quick open button — replace URL with real payment link per item */}
                                        <div className='mt-3'>
                                            <Button size='sm' onClick={() => openPaymentPanel('https://payments.example.com/checkout/txn_sample')}>
                                                Open Payment Link
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Activity */}
                            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                                <Card className='col-span-4'>
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                        <CardDescription>Your latest chama activities and transactions.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='space-y-4'>
                                            <div className='flex items-center space-x-4'>
                                                <Avatar className='h-9 w-9'>
                                                    <AvatarFallback>JD</AvatarFallback>
                                                </Avatar>
                                                <div className='space-y-1'>
                                                    <p className='text-sm font-medium leading-none'>Contribution made to "Wakulima Chama"</p>
                                                    <p className='text-sm text-muted-foreground'>KSh 2,000 • 2 hours ago</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center space-x-4'>
                                                <Avatar className='h-9 w-9'>
                                                    <AvatarFallback>MK</AvatarFallback>
                                                </Avatar>
                                                <div className='space-y-1'>
                                                    <p className='text-sm font-medium leading-none'>Loan approved for Mary Kimani</p>
                                                    <p className='text-sm text-muted-foreground'>KSh 10,000 • 1 day ago</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center space-x-4'>
                                                <Avatar className='h-9 w-9'>
                                                    <AvatarFallback>PN</AvatarFallback>
                                                </Avatar>
                                                <div className='space-y-1'>
                                                    <p className='text-sm font-medium leading-none'>New member joined "Tech Chama"</p>
                                                    <p className='text-sm text-muted-foreground'>Peter Njoroge • 3 days ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className='col-span-3'>
                                    <CardHeader>
                                        <CardTitle>My Chamas</CardTitle>
                                        <CardDescription>Your active chama memberships.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='space-y-4'>
                                            <div className='flex items-center justify-between'>
                                                <div className='space-y-1'>
                                                    <p className='text-sm font-medium'>Wakulima Chama</p>
                                                    <p className='text-xs text-muted-foreground'>12 members • Monthly</p>
                                                </div>
                                                <div className='text-right'>
                                                    <p className='text-sm font-medium'>KSh 2,000</p>
                                                    <p className='text-xs text-muted-foreground'>per month</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='space-y-1'>
                                                    <p className='text-sm font-medium'>Tech Chama</p>
                                                    <p className='text-xs text-muted-foreground'>8 members • Weekly</p>
                                                </div>
                                                <div className='text-right'>
                                                    <p className='text-sm font-medium'>KSh 1,500</p>
                                                    <p className='text-xs text-muted-foreground'>per week</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='space-y-1'>
                                                    <p className='text-sm font-medium'>Women's Group</p>
                                                    <p className='text-xs text-muted-foreground'>15 members • Monthly</p>
                                                </div>
                                                <div className='text-right'>
                                                    <p className='text-sm font-medium'>KSh 3,000</p>
                                                    <p className='text-xs text-muted-foreground'>per month</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </main>

                    {/* In-dashboard payment slide-over / panel */}
                    {paymentUrl && (
                        <div className='fixed right-0 top-0 z-50 h-full w-full sm:w-1/3 bg-card shadow-lg border-l overflow-auto'>
                            <div className='flex items-center justify-between p-4 border-b'>
                                <h3 className='text-lg font-medium'>Pending Payment</h3>
                                <div className='flex items-center gap-2'>
                                    <Button variant='ghost' size='sm' onClick={closePaymentPanel}>Close</Button>
                                </div>
                            </div>
                            <div className='p-4 h-[calc(100%-64px)]'>
                                {/* iframe shows payment URL — ensure the target provider allows embedding */}
                                <iframe
                                    src={paymentUrl}
                                    title='Payment'
                                    className='w-full h-full border'
                                />
                            </div>
                        </div>
                    )}

                    <footer>
                        <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
                            <p className='text-sm text-balance max-sm:text-center'>
                                {`©${new Date().getFullYear()}`}{' '}
                                <a href='#' className='text-primary'>
                                    Niokolee
                                </a>
                                , Bettering Kenya pamoja
                            </p>

                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default ApplicationShell
