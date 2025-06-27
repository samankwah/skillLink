import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Download, 
  Share2, 
  ExternalLink, 
  Search,
  Calendar,
  CheckCircle,
  Eye,
  Copy
} from 'lucide-react'
import { useLMS } from '@/context/LMSContext'

const Certificates = () => {
  const { certificates } = useLMS()
  const [searchQuery, setSearchQuery] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)

  const filteredCertificates = certificates.filter(cert =>
    cert.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDownload = (certificate) => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading certificate:', certificate)
    alert('Certificate download started!')
  }

  const handleShare = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `My ${certificate.courseName} Certificate`,
        text: `I've completed the ${certificate.courseName} course on SkillLink!`,
        url: certificate.verificationUrl
      })
    } else {
      navigator.clipboard.writeText(certificate.verificationUrl)
      alert('Certificate link copied to clipboard!')
    }
  }

  const handleVerify = () => {
    // Mock verification
    if (verificationCode.startsWith('SL-')) {
      setVerificationResult({
        valid: true,
        courseName: 'JavaScript Fundamentals',
        recipientName: 'John Doe',
        completionDate: '2024-01-15',
        issuer: 'SkillLink'
      })
    } else {
      setVerificationResult({
        valid: false
      })
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">Your earned certificates and verification system</p>
        </div>
        <Badge variant="secondary" className="w-fit">
          <Award className="w-3 h-3 mr-1" />
          {certificates.length} Earned
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Certificates */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                My Certificates
              </CardTitle>
              <CardDescription>
                Certificates you've earned by completing courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search certificates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Certificates List */}
              <div className="space-y-4">
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((certificate) => (
                    <Card key={certificate.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold">{certificate.courseName}</h3>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                <span>Completed: {new Date(certificate.completionDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" />
                                <span>Verification Code: {certificate.verificationCode}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(certificate.verificationCode)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(certificate)}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleShare(certificate)}
                            >
                              <Share2 className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(certificate.verificationUrl, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete courses to earn your first certificate
                    </p>
                    <Button asChild>
                      <a href="/courses">Browse Courses</a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Verification */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Verify Certificate
              </CardTitle>
              <CardDescription>
                Enter a verification code to validate a certificate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Verification Code</label>
                <Input
                  placeholder="SL-123-456789"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <Button onClick={handleVerify} className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Verify Certificate
              </Button>

              {/* Verification Result */}
              {verificationResult && (
                <Card className={`${verificationResult.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <CardContent className="pt-6">
                    {verificationResult.valid ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-semibold">Certificate Valid</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Course:</span>{' '}
                            <span>{verificationResult.courseName}</span>
                          </div>
                          <div>
                            <span className="font-medium">Recipient:</span>{' '}
                            <span>{verificationResult.recipientName}</span>
                          </div>
                          <div>
                            <span className="font-medium">Completed:</span>{' '}
                            <span>{verificationResult.completionDate}</span>
                          </div>
                          <div>
                            <span className="font-medium">Issued by:</span>{' '}
                            <span>{verificationResult.issuer}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-red-700">
                        <div className="flex items-center gap-2 mb-2">
                          <ExternalLink className="h-5 w-5" />
                          <span className="font-semibold">Invalid Certificate</span>
                        </div>
                        <p className="text-sm">
                          The verification code you entered is not valid or the certificate has expired.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* How Verification Works */}
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
                    <p className="font-medium">Complete Course</p>
                    <p className="text-muted-foreground">Finish all lessons and pass quizzes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Receive Certificate</p>
                    <p className="text-muted-foreground">Get a unique verification code</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Share & Verify</p>
                    <p className="text-muted-foreground">Others can verify authenticity online</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Certificates