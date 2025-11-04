import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Video, Check, Camera, RefreshCw, Loader2, Eye, User, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface MultiDeviceContractScreenProps {
  onBack: () => void;
  onComplete?: () => void;
}

type Step = 'details' | 'face-verification' | 'signature' | 'review';

type PartyStatus = {
  faceVerified: boolean;
  signed: boolean;
  currentAction: 'idle' | 'verifying-face' | 'signing' | 'completed';
};

export function MultiDeviceContractScreen({ onBack, onComplete }: MultiDeviceContractScreenProps) {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [contractData, setContractData] = useState({
    title: '',
    party1Name: '',
    party1Company: '',
    party2Name: '',
    party2Company: '',
    description: '',
    terms: '',
    amount: '',
    startDate: '',
    endDate: '',
  });
  
  // Current user (Party 1 - the account holder)
  const [currentUserStatus, setCurrentUserStatus] = useState<PartyStatus>({
    faceVerified: false,
    signed: false,
    currentAction: 'idle',
  });
  
  // Other party (Party 2)
  const [otherPartyStatus, setOtherPartyStatus] = useState<PartyStatus>({
    faceVerified: false,
    signed: false,
    currentAction: 'idle',
  });
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [signature, setSignature] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Simulate real-time updates from other party
  useEffect(() => {
    // Simulate other party actions
    const simulateOtherParty = () => {
      if (currentUserStatus.faceVerified && !otherPartyStatus.faceVerified) {
        // After current user verifies, simulate other party starting verification
        setTimeout(() => {
          setOtherPartyStatus(prev => ({ ...prev, currentAction: 'verifying-face' }));
        }, 3000);
        
        // Then completing verification
        setTimeout(() => {
          setOtherPartyStatus(prev => ({ 
            ...prev, 
            faceVerified: true, 
            currentAction: 'idle' 
          }));
          toast.success('Other party has completed face verification!');
        }, 8000);
      }
      
      if (currentUserStatus.signed && otherPartyStatus.faceVerified && !otherPartyStatus.signed) {
        // After current user signs, simulate other party signing
        setTimeout(() => {
          setOtherPartyStatus(prev => ({ ...prev, currentAction: 'signing' }));
        }, 2000);
        
        // Then completing signature
        setTimeout(() => {
          setOtherPartyStatus(prev => ({ 
            ...prev, 
            signed: true, 
            currentAction: 'completed' 
          }));
          toast.success('Other party has completed signing!');
        }, 6000);
      }
    };
    
    simulateOtherParty();
  }, [currentUserStatus, otherPartyStatus.faceVerified, otherPartyStatus.signed]);

  const handleVerifyFace = () => {
    setIsVerifying(true);
    setCurrentUserStatus(prev => ({ ...prev, currentAction: 'verifying-face' }));
    
    // Simulate face verification process
    setTimeout(() => {
      setCurrentUserStatus(prev => ({ 
        ...prev, 
        faceVerified: true, 
        currentAction: 'idle' 
      }));
      setIsVerifying(false);
      toast.success('Your face verified successfully!');
    }, 2500);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setCurrentUserStatus(prev => ({ ...prev, currentAction: 'signing' }));
    const signatureData = canvas.toDataURL();
    setSignature(signatureData);
    
    setTimeout(() => {
      setCurrentUserStatus(prev => ({ 
        ...prev, 
        signed: true, 
        currentAction: 'idle' 
      }));
      toast.success('Signature saved!');
    }, 1000);
  };

  const handleComplete = () => {
    if (currentUserStatus.signed && otherPartyStatus.signed) {
      toast.success('Contract created and signed by both parties successfully!');
      onComplete?.();
    } else {
      toast.error('Both parties must complete signing before finalizing the contract.');
    }
  };

  useEffect(() => {
    if (currentStep === 'signature' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
      }
    }
  }, [currentStep]);

  const handleNextStep = () => {
    const steps: Step[] = ['details', 'face-verification', 'signature', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePreviousStep = () => {
    const steps: Step[] = ['details', 'face-verification', 'signature', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="flex items-center gap-3">
          <button onClick={handlePreviousStep} className="rounded-full p-2 hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">Create Contract (Multi-Device)</h2>
            <p className="text-white/80">
              {currentStep === 'details' && 'Step 1: Contract Details'}
              {currentStep === 'face-verification' && 'Step 2: Face Verification'}
              {currentStep === 'signature' && 'Step 3: Digital Signature'}
              {currentStep === 'review' && 'Step 4: Review & Confirm'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 pb-24">
        {/* Step 1: Contract Details */}
        {currentStep === 'details' && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="mb-4">Contract Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Contract Title *</Label>
                  <Input
                    id="title"
                    value={contractData.title}
                    onChange={(e) => setContractData({ ...contractData, title: e.target.value })}
                    placeholder="e.g., Organic Vegetables Supply Agreement"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={contractData.description}
                    onChange={(e) => setContractData({ ...contractData, description: e.target.value })}
                    placeholder="Brief description of the contract"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={contractData.amount}
                      onChange={(e) => setContractData({ ...contractData, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={contractData.startDate}
                      onChange={(e) => setContractData({ ...contractData, startDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Your Information (Party 1)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="party1Name">Full Name *</Label>
                  <Input
                    id="party1Name"
                    value={contractData.party1Name}
                    onChange={(e) => setContractData({ ...contractData, party1Name: e.target.value })}
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <Label htmlFor="party1Company">Company/Organization</Label>
                  <Input
                    id="party1Company"
                    value={contractData.party1Company}
                    onChange={(e) => setContractData({ ...contractData, party1Company: e.target.value })}
                    placeholder="Your Company"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Other Party Information (Party 2)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="party2Name">Full Name *</Label>
                  <Input
                    id="party2Name"
                    value={contractData.party2Name}
                    onChange={(e) => setContractData({ ...contractData, party2Name: e.target.value })}
                    placeholder="Other Party's Name"
                  />
                </div>
                <div>
                  <Label htmlFor="party2Company">Company/Organization</Label>
                  <Input
                    id="party2Company"
                    value={contractData.party2Company}
                    onChange={(e) => setContractData({ ...contractData, party2Company: e.target.value })}
                    placeholder="Their Company"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Terms & Conditions</h3>
              <Textarea
                value={contractData.terms}
                onChange={(e) => setContractData({ ...contractData, terms: e.target.value })}
                placeholder="Enter contract terms and conditions..."
                rows={6}
              />
            </Card>

            <Button 
              onClick={handleNextStep}
              className="w-full bg-[#af47ff] hover:bg-[#9333ea]"
              size="lg"
              disabled={!contractData.title || !contractData.party1Name || !contractData.party2Name}
            >
              Continue to Face Verification
            </Button>
          </div>
        )}

        {/* Step 2: Face Verification */}
        {currentStep === 'face-verification' && (
          <div className="space-y-4">
            {/* Current User's Verification */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3>Your Face Verification</h3>
                {currentUserStatus.faceVerified && (
                  <Badge className="bg-green-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>

              {!currentUserStatus.faceVerified ? (
                <>
                  <div className="mb-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#af47ff]/10">
                      <Video className="h-8 w-8 text-[#af47ff]" />
                    </div>
                    <p className="text-gray-600">
                      Position your face in the frame for verification
                    </p>
                  </div>

                  {/* Simulated camera view */}
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                    <div className="flex h-full items-center justify-center">
                      {isVerifying ? (
                        <Loader2 className="h-24 w-24 animate-spin text-[#af47ff]" />
                      ) : (
                        <Camera className="h-24 w-24 text-gray-600" />
                      )}
                    </div>
                    {/* Face detection overlay */}
                    <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/50"></div>
                  </div>

                  <div className="mt-6">
                    <Button 
                      onClick={handleVerifyFace}
                      className="w-full bg-[#af47ff] hover:bg-[#9333ea]"
                      size="lg"
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-5 w-5" />
                          Verify Face
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <CheckCircle2 className="mx-auto mb-2 h-12 w-12 text-green-500" />
                  <p className="text-green-700">Your face has been verified successfully!</p>
                </div>
              )}
            </Card>

            {/* Other Party's Status */}
            <Card className="p-6 border-2 border-dashed">
              <div className="mb-4 flex items-center justify-between">
                <h3>Other Party's Verification</h3>
                {otherPartyStatus.faceVerified && (
                  <Badge className="bg-green-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <p className="mb-2">{contractData.party2Name}</p>
                {otherPartyStatus.currentAction === 'verifying-face' ? (
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying face...</span>
                  </div>
                ) : otherPartyStatus.faceVerified ? (
                  <p className="text-green-600">Face verified ✓</p>
                ) : (
                  <p className="text-gray-500">Waiting for face verification</p>
                )}
              </div>
            </Card>

            <Button 
              onClick={handleNextStep}
              className="w-full bg-[#af47ff] hover:bg-[#9333ea]"
              size="lg"
              disabled={!currentUserStatus.faceVerified || !otherPartyStatus.faceVerified}
            >
              {(!currentUserStatus.faceVerified || !otherPartyStatus.faceVerified) ? (
                'Waiting for both parties to verify...'
              ) : (
                'Continue to Signature'
              )}
            </Button>
          </div>
        )}

        {/* Step 3: Digital Signature */}
        {currentStep === 'signature' && (
          <div className="space-y-4">
            {/* Current User's Signature */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3>Your Signature</h3>
                {currentUserStatus.signed && (
                  <Badge className="bg-green-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Signed
                  </Badge>
                )}
              </div>

              {!currentUserStatus.signed ? (
                <>
                  <p className="mb-4 text-gray-600">
                    Draw your signature in the box below
                  </p>

                  <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-2">
                    <canvas
                      ref={canvasRef}
                      width={340}
                      height={200}
                      className="w-full touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button 
                      onClick={clearSignature}
                      variant="outline"
                      className="flex-1"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                    <Button 
                      onClick={saveSignature}
                      className="flex-1 bg-[#af47ff] hover:bg-[#9333ea]"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Save Signature
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-500" />
                    <p className="text-green-700">Your signature has been saved!</p>
                  </div>
                  {signature && (
                    <div className="rounded-lg border-2 border-gray-200 bg-white p-2">
                      <img src={signature} alt="Your signature" className="w-full" />
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Other Party's Signature Status */}
            <Card className="p-6 border-2 border-dashed">
              <div className="mb-4 flex items-center justify-between">
                <h3>Other Party's Signature</h3>
                {otherPartyStatus.signed && (
                  <Badge className="bg-green-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Signed
                  </Badge>
                )}
              </div>

              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <p className="mb-2">{contractData.party2Name}</p>
                {otherPartyStatus.currentAction === 'signing' ? (
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing contract...</span>
                  </div>
                ) : otherPartyStatus.signed ? (
                  <p className="text-green-600">Contract signed ✓</p>
                ) : (
                  <p className="text-gray-500">Waiting for signature</p>
                )}
              </div>
            </Card>

            <Button 
              onClick={handleNextStep}
              className="w-full bg-[#af47ff] hover:bg-[#9333ea]"
              size="lg"
              disabled={!currentUserStatus.signed || !otherPartyStatus.signed}
            >
              {(!currentUserStatus.signed || !otherPartyStatus.signed) ? (
                'Waiting for both parties to sign...'
              ) : (
                'Continue to Review'
              )}
            </Button>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 'review' && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="mb-4">Contract Summary</h3>
              <div className="space-y-3">
                <div>
                  <Label>Contract Title</Label>
                  <p>{contractData.title}</p>
                </div>
                {contractData.description && (
                  <div>
                    <Label>Description</Label>
                    <p className="text-gray-600">{contractData.description}</p>
                  </div>
                )}
                {contractData.amount && (
                  <div>
                    <Label>Amount</Label>
                    <p className="text-[#af47ff]">${contractData.amount}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Signing Status</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <div>
                    <Label>You ({contractData.party1Name})</Label>
                    {contractData.party1Company && (
                      <p className="text-gray-600">{contractData.party1Company}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Face Verified
                    </Badge>
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Signed
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start justify-between rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <div>
                    <Label>{contractData.party2Name}</Label>
                    {contractData.party2Company && (
                      <p className="text-gray-600">{contractData.party2Company}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Face Verified
                    </Badge>
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Signed
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {contractData.terms && (
              <Card className="p-4">
                <h3 className="mb-4">Terms & Conditions</h3>
                <p className="whitespace-pre-wrap text-gray-600">{contractData.terms}</p>
              </Card>
            )}

            <div className="rounded-lg bg-green-50 border-2 border-green-200 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800">
                    Both parties have completed face verification and signed the contract.
                  </p>
                  <p className="text-green-700">Ready to finalize!</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleComplete}
              className="w-full bg-green-500 hover:bg-green-600"
              size="lg"
            >
              <Check className="mr-2 h-5 w-5" />
              Confirm & Create Contract
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
