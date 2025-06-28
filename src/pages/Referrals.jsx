import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  UserPlus, 
  Share2, 
  Copy, 
  Mail, 
  Users, 
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Gift
} from 'lucide-react'
import { useReferral } from '@/context/ReferralContext'

const Referrals = () => {
  const { 
    referralCode, 
    referrals, 
    referralStats, 
    sendReferral, 
    shareReferralLink,
    isLoading 
  } = useReferral()
  
  const [referralForm, setReferralForm] = useState({
    email: '',
    name: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReferralForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSendReferral = async (e) => {
    e.preventDefault()
    const result = await sendReferral(referralForm.email, referralForm.name)
    if (result.success) {
      setReferralForm({ email: '', name: '' })
      alert('Referral sent successfully!')
    }
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    alert('Referral code copied to clipboard!')
  }

  const copyReferralLink = () => {
    const link = `https://skilllink.com/register?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    alert('Referral link copied to clipboard!')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3" />
      case 'pending':
        return <Clock className="h-3 w-3" />
      default:
        return <UserPlus className="h-3 w-3" />
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Referral Program</h1>
          <p className="text-muted-foreground">Invite friends and earn rewards for growing our community</p>
        </div>
        <Badge variant="secondary" className="w-fit">
          <Gift className="w-3 h-3 mr-1" />
          {referralStats.rewardPoints} Points
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">People you've invited</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.successfulReferrals}</div>
            <p className="text-xs text-muted-foreground">Joined the platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.pendingReferrals}</div>
            <p className="text-xs text-muted-foreground">Waiting to join</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.rewardPoints}</div>
            <p className="text-xs text-muted-foreground">+25 per successful referral</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invite Friends */}
        <div className="w-full lg:col-span-2 space-y-6">
          {/* Your Referral Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Your Referral Code
              </CardTitle>
              <CardDescription>
                Share this code with friends to earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 overflow-hidden">
              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <div className="relative">
                    <Input
                      value={referralCode}
                      readOnly
                      className="text-center font-mono text-lg font-bold w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button variant="outline" onClick={copyReferralCode} className="w-full sm:flex-1 flex-shrink-0">
                    <Copy className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Copy Code</span>
                  </Button>
                  <Button variant="outline" onClick={copyReferralLink} className="w-full sm:flex-1 flex-shrink-0">
                    <Copy className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Copy Link</span>
                  </Button>
                  <Button onClick={shareReferralLink} className="w-full sm:flex-1 flex-shrink-0">
                    <Share2 className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Share</span>
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Share this link: <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  https://skilllink.com/register?ref={referralCode}
                </code></p>
              </div>
            </CardContent>
          </Card>

          {/* Send Direct Invitation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send Direct Invitation
              </CardTitle>
              <CardDescription>
                Invite someone directly by email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendReferral} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      name="name"
                      placeholder="Friend's name"
                      value={referralForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="friend@example.com"
                      value={referralForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? 'Sending...' : 'Send Invitation'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Referral History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Referral History
              </CardTitle>
              <CardDescription>
                Track your referrals and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {referrals.length > 0 ? (
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                          <UserPlus className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{referral.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{referral.email}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Referred: {referral.referredDate}</span>
                            </div>
                            {referral.joinedDate && (
                              <div className="flex items-center gap-1">
                                <span className="hidden sm:inline">•</span>
                                <span>Joined: {referral.joinedDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <Badge variant="secondary" className={getStatusColor(referral.status)}>
                          {getStatusIcon(referral.status)}
                          <span className="ml-1 capitalize">{referral.status}</span>
                        </Badge>
                        {referral.rewardEarned > 0 && (
                          <p className="text-sm font-medium text-green-600">
                            +{referral.rewardEarned} points
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No referrals yet</h3>
                  <p className="text-muted-foreground">
                    Start inviting friends to earn your first rewards!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full space-y-6">
          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Share Your Code</p>
                    <p className="text-muted-foreground">Send your referral code to friends</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Friend Joins</p>
                    <p className="text-muted-foreground">They sign up using your code</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Earn Rewards</p>
                    <p className="text-muted-foreground">Get 25 points per successful referral</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rewards Info */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>Per successful referral:</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary">25 Points</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Bonus for 10 referrals:</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary">100 Points</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Special recognition:</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary">Badge</Badge>
              </div>
              <div className="pt-2 border-t">
                <p className="text-muted-foreground">
                  Points can be redeemed for exclusive courses and certificates!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-2">
                <p>• Share with professional contacts</p>
                <p>• Post on social media</p>
                <p>• Include in email signatures</p>
                <p>• Tell classmates and colleagues</p>
                <p>• Explain the benefits of SkillLink</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Referrals