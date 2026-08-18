"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/use-profile";
import { useMyPosts } from "@/hooks/use-my-posts";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  TrendingUp,
  Zap,
  Globe,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MapPin,
  CalendarClock,
  ExternalLink,
  Phone,
  Sparkles,
  CreditCard,
  Coins,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CHART_COLORS = {
  primary: "hsl(168, 80%, 32%)",
  accent: "hsl(38, 92%, 50%)",
};

// Faithful-but-scoped port of Promylink/src/pages/PosterDashboard.tsx.
// Posts + stats are real (GET /posts/mine, all Prisma columns already
// exist). Drafts, the ad-creation dialog, boost/click purchase dialogs, and
// the KYC banner aren't ported — they depend on the create-post flow and
// wallet/payments modules, which are out of scope for this pass (see the
// scaffolding plan). Buy Clicks / Boost buttons route to /pricing instead of
// opening a purchase dialog, same fallback used on the Pricing page itself.
// "View Analytics" is omitted since /post-analytics/:id isn't built yet.
export default function PosterDashboardPage() {
  const { data: profile } = useProfile();
  const { data: posts = [] } = useMyPosts();
  const { toast } = useToast();

  const activePosts = posts.filter((p) => p.status === "approved" && p.creditsRemaining > 0);
  const totalClicks = posts.reduce((sum, p) => sum + (p.clicks || 0), 0);
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0";

  const stats = [
    { label: "Total Clicks", value: totalClicks.toLocaleString(), icon: MousePointerClick, color: "text-primary", bgColor: "bg-primary/10" },
    { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-[hsl(var(--accent))]", bgColor: "bg-[hsl(var(--accent))]/10" },
    { label: "CTR", value: `${ctr}%`, icon: TrendingUp, color: "text-[hsl(var(--success))]", bgColor: "bg-[hsl(var(--success))]/10" },
    { label: "Active Posts", value: activePosts.length.toString(), icon: FileText, color: "text-[hsl(var(--boost))]", bgColor: "bg-[hsl(var(--boost))]/10" },
  ];

  const dailyStats = posts.length > 0
    ? posts.slice(0, 7).map((p) => ({
        date: new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        clicks: p.clicks || 0,
        views: p.views || 0,
      }))
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Poster Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Track your promotion performance and analytics.
                {profile?.phone && (
                  <span className="inline-flex items-center gap-1 ml-2">
                    <Phone className="h-3 w-3" /> {profile.phone}
                  </span>
                )}
              </p>
            </div>
            <Button
              className="gap-2"
              variant="outline"
              onClick={() => toast({ title: "Coming soon", description: "Post creation is still being built." })}
            >
              <FileText className="h-4 w-4" />
              New Post
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-5 bg-muted/40">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-muted">
                      <Sparkles className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Free Plan</h3>
                      <p className="text-xs text-muted-foreground">Upgrade to unlock premium features</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[hsl(var(--accent))]">{(profile?.walletCredits ?? 0).toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Wallet Credits</p>
                    </div>
                    {profile?.isVerified && (
                      <div className="text-center">
                        <p className="text-lg font-bold">✅</p>
                        <p className="text-[10px] text-muted-foreground">Verified</p>
                      </div>
                    )}
                  </div>

                  <div className="sm:ml-4 flex-shrink-0 flex gap-2">
                    <Link href="/pricing">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Coins className="h-4 w-4" />
                        Buy Credits
                      </Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="gradient" size="sm" className="gap-2">
                        <CreditCard className="h-4 w-4" />
                        Upgrade
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">No posts yet</p>
                      <p className="text-sm">Create your first post to see it here.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {posts.map((post) => {
                    const isExpired = post.creditsRemaining === 0 && post.status !== "hold";
                    const isHold = post.status === "hold";
                    const isBoosted = post.isBoosted && post.boostExpiresAt && new Date(post.boostExpiresAt) > new Date();
                    const creditsPercentage = post.totalCredits > 0 ? (post.creditsRemaining / post.totalCredits) * 100 : 0;
                    const ctrPost = post.views > 0 ? ((post.clicks / post.views) * 100).toFixed(1) : "0";

                    const gracePeriodEnd = post.gracePeriodEndsAt ? new Date(post.gracePeriodEndsAt) : null;
                    const boostExpiry = post.boostExpiresAt ? new Date(post.boostExpiresAt) : null;
                    const expiresAt = post.expiresAt ? new Date(post.expiresAt) : null;

                    const statusColor = post.status === "approved"
                      ? "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10"
                      : post.status === "pending"
                      ? "text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10"
                      : post.status === "rejected"
                      ? "text-destructive bg-destructive/10"
                      : "text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10";

                    const statusIcon = post.status === "approved"
                      ? <CheckCircle2 className="h-3.5 w-3.5" />
                      : post.status === "pending"
                      ? <Clock className="h-3.5 w-3.5" />
                      : post.status === "rejected"
                      ? <XCircle className="h-3.5 w-3.5" />
                      : <AlertTriangle className="h-3.5 w-3.5" />;

                    return (
                      <Card key={post.id} className={`overflow-hidden transition-all ${isExpired ? "opacity-60" : ""} ${isBoosted ? "ring-1 ring-[hsl(var(--boost))]/40" : ""}`}>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="font-semibold text-base line-clamp-1">{post.title}</h3>
                                {isBoosted && (
                                  <Badge variant="boost" className="gap-1 text-[10px]">
                                    <Zap className="h-3 w-3" /> Boosted
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-[10px]">
                                  {post.category?.icon || "📦"} {post.category?.name || "Uncategorized"}
                                </Badge>
                                <Badge className={`text-[10px] gap-1 ${statusColor}`}>
                                  {statusIcon}
                                  <span className="capitalize">{isExpired ? "Expired" : isHold ? "On Hold" : post.status === "pending" ? "In Review" : post.status}</span>
                                </Badge>
                                {post.targetLocation && (
                                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> {post.targetLocation}
                                  </span>
                                )}
                              </div>
                            </div>
                            <a href={post.linkUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors" title="Open link">
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </a>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                              <div className="flex items-center gap-1.5 text-primary mb-1">
                                <MousePointerClick className="h-3.5 w-3.5" />
                                <span className="text-[10px] font-medium">Clicks</span>
                              </div>
                              <p className="text-lg font-bold">{(post.clicks || 0).toLocaleString()}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/10">
                              <div className="flex items-center gap-1.5 text-[hsl(var(--accent))] mb-1">
                                <Eye className="h-3.5 w-3.5" />
                                <span className="text-[10px] font-medium">Views</span>
                              </div>
                              <p className="text-lg font-bold">{(post.views || 0).toLocaleString()}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[hsl(var(--success))]/5 border border-[hsl(var(--success))]/10">
                              <div className="flex items-center gap-1.5 text-[hsl(var(--success))] mb-1">
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span className="text-[10px] font-medium">CTR</span>
                              </div>
                              <p className="text-lg font-bold">{ctrPost}%</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[hsl(var(--boost))]/5 border border-[hsl(var(--boost))]/10">
                              <div className="flex items-center gap-1.5 text-[hsl(var(--boost))] mb-1">
                                <Globe className="h-3.5 w-3.5" />
                                <span className="text-[10px] font-medium">Credits Left</span>
                              </div>
                              <p className="text-lg font-bold">{post.creditsRemaining}<span className="text-xs font-normal text-muted-foreground">/{post.totalCredits}</span></p>
                            </div>
                          </div>

                          {post.totalCredits > 0 && (
                            <div className="mb-4">
                              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${creditsPercentage > 20 ? "gradient-primary" : "bg-destructive"}`}
                                  style={{ width: `${creditsPercentage}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-1">{creditsPercentage.toFixed(0)}% credits remaining</p>
                            </div>
                          )}

                          {post.creditsRemaining > 0 && post.creditsRemaining <= 20 && post.status === "approved" && (
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-destructive/5 border border-destructive/10 mb-4">
                              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                              <p className="text-xs text-destructive font-medium">
                                Low balance! Only {post.creditsRemaining} clicks left.{" "}
                                <Link href="/pricing" className="underline">Buy more</Link>
                              </p>
                            </div>
                          )}

                          {(isExpired || (isHold && post.creditsRemaining === 0)) && (
                            <div className="flex flex-col gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/10 mb-4">
                              <p className="text-xs text-destructive font-semibold flex items-center gap-1.5">
                                <XCircle className="h-3.5 w-3.5" />
                                {isExpired ? "Post expired — recharge to go live again" : "Credits exhausted — add clicks or boost"}
                              </p>
                              <div className="flex gap-2">
                                <Link href="/pricing">
                                  <Button size="sm" className="gap-1.5 text-xs h-7">
                                    <MousePointerClick className="h-3 w-3" /> Buy Clicks
                                  </Button>
                                </Link>
                                <Link href="/pricing">
                                  <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7 border-[hsl(var(--boost))]/50 text-[hsl(var(--boost))]">
                                    <Zap className="h-3 w-3" /> Boost
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarClock className="h-3 w-3" />
                              Created {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            {isBoosted && boostExpiry && (
                              <span className="flex items-center gap-1 text-[hsl(var(--boost))]">
                                <Zap className="h-3 w-3" />
                                Boost expires {boostExpiry.toLocaleDateString()}
                              </span>
                            )}
                            {isHold && gracePeriodEnd && (
                              <span className="flex items-center gap-1 text-destructive">
                                <AlertTriangle className="h-3 w-3" />
                                Expires {gracePeriodEnd.toLocaleDateString()} (grace period)
                              </span>
                            )}
                            {expiresAt && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Link expires {expiresAt.toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          {post.rejectionFeedback && (
                            <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10 mb-4">
                              <p className="text-xs font-medium text-destructive mb-0.5">Rejection Feedback</p>
                              <p className="text-xs text-muted-foreground">{post.rejectionFeedback}</p>
                            </div>
                          )}

                          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border/50">
                            {(post.status === "approved" || isHold || isExpired) && (
                              <Link href="/pricing">
                                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                                  <MousePointerClick className="h-3.5 w-3.5" /> Buy Clicks
                                </Button>
                              </Link>
                            )}
                            {isBoosted ? (
                              <Badge variant="boost" className="text-[10px] gap-1 h-8 px-3">
                                <Zap className="h-3 w-3" /> Boost Active
                              </Badge>
                            ) : (post.status === "approved" || isHold) ? (
                              <Link href="/pricing">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1.5 text-xs h-8 border-[hsl(var(--boost))]/50 text-[hsl(var(--boost))] hover:bg-[hsl(var(--boost))]/10"
                                >
                                  <Zap className="h-3.5 w-3.5" /> Boost Post
                                </Button>
                              </Link>
                            ) : null}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Performance Summary</CardTitle>
                  <CardDescription>Clicks and views across your posts</CardDescription>
                </CardHeader>
                <CardContent>
                  {dailyStats.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyStats}>
                          <defs>
                            <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                              <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.accent} stopOpacity={0.2} />
                              <stop offset="100%" stopColor={CHART_COLORS.accent} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 45%)" />
                          <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 45%)" />
                          <Tooltip
                            contentStyle={{
                              background: "hsl(0, 0%, 100%)",
                              border: "1px solid hsl(210, 20%, 90%)",
                              borderRadius: "8px",
                              fontSize: "13px",
                            }}
                          />
                          <Legend />
                          <Area type="monotone" dataKey="views" stroke={CHART_COLORS.accent} fill="url(#fillViews)" strokeWidth={2} name="Views" />
                          <Area type="monotone" dataKey="clicks" stroke={CHART_COLORS.primary} fill="url(#fillClicks)" strokeWidth={2} name="Clicks" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground text-sm">
                      No data to display yet. Create posts to see analytics.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
