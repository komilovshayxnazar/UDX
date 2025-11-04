import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Video, Check, User, FileText, Camera, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface CreateContractScreenProps {
  onBack: () => void;
  onComplete?: () => void;
}

type Step = 'details' | 'party1-face' | 'party2-face' | 'party1-signature' | 'party2-signature' | 'review';

export function CreateContractScreen({ onBack, onComplete }: CreateContractScreenProps) {
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
  const [party1FaceVerified, setParty1FaceVerified] = useState(false);
  const [party2FaceVerified, setParty2FaceVerified] = useState(false);
  const [party1Signature, setParty1Signature] = useState('');
  const [party2Signature, setParty2Signature] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleNextStep = () => {
    const steps: Step[] = ['details', 'party1-face', 'party2-face', 'party1-signature', 'party2-signature', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePreviousStep = () => {
    const steps: Step[] = ['details', 'party1-face', 'party2-face', 'party1-signature', 'party2-signature', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  const handleVerifyFace = (party: 'party1' | 'party2') => {
    // Simulate face verification
    setTimeout(() => {
      if (party === 'party1') {
        setParty1FaceVerified(true);
        toast.success('Party 1 face verified successfully!');
        handleNextStep();
      } else {
        setParty2FaceVerified(true);
        toast.success('Party 2 face verified successfully!');
        handleNextStep();
      }
    }, 2000);
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

  const saveSignature = (party: 'party1' | 'party2') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const signature = canvas.toDataURL();
    if (party === 'party1') {
      setParty1Signature(signature);
      toast.success('Signature saved!');
      handleNextStep();
    } else {
      setParty2Signature(signature);
      toast.success('Signature saved!');
      handleNextStep();
    }
  };

  const handleComplete = () => {
    toast.success('Contract created and signed successfully!');
    onComplete?.();
  };

  useEffect(() => {
    if ((currentStep === 'party1-signature' || currentStep === 'party2-signature') && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
      }
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="flex items-center gap-3">
          <button onClick={handlePreviousStep} className="rounded-full p-2 hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">Create Contract</h2>
            <p className="text-white/80">
              {currentStep === 'details' && 'Step 1: Contract Details'}
              {currentStep === 'party1-face' && 'Step 2: Party 1 Verification'}
              {currentStep === 'party2-face' && 'Step 3: Party 2 Verification'}
              {currentStep === 'party1-signature' && 'Step 4: Party 1 Signature'}
              {currentStep === 'party2-signature' && 'Step 5: Party 2 Signature'}
              {currentStep === 'review' && 'Step 6: Review & Confirm'}
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
              <h3 className="mb-4">Party 1 (First Party)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="party1Name">Full Name *</Label>
                  <Input
                    id="party1Name"
                    value={contractData.party1Name}
                    onChange={(e) => setContractData({ ...contractData, party1Name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="party1Company">Company/Organization</Label>
                  <Input
                    id="party1Company"
                    value={contractData.party1Company}
                    onChange={(e) => setContractData({ ...contractData, party1Company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Party 2 (Second Party)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="party2Name">Full Name *</Label>
                  <Input
                    id="party2Name"
                    value={contractData.party2Name}
                    onChange={(e) => setContractData({ ...contractData, party2Name: e.target.value })}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="party2Company">Company/Organization</Label>
                  <Input
                    id="party2Company"
                    value={contractData.party2Company}
                    onChange={(e) => setContractData({ ...contractData, party2Company: e.target.value })}
                    placeholder="Company Name"
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
              Continue to Verification
            </Button>
          </div>
        )}

        {/* Step 2 & 3: Face Verification */}
        {(currentStep === 'party1-face' || currentStep === 'party2-face') && (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="mb-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#af47ff]/10">
                  <Video className="h-8 w-8 text-[#af47ff]" />
                </div>
                <h3 className="mb-2">
                  {currentStep === 'party1-face' ? contractData.party1Name : contractData.party2Name} Face Verification
                </h3>
                <p className="text-gray-600">
                  Position your face in the frame for verification
                </p>
              </div>

              {/* Simulated camera view */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                <div className="flex h-full items-center justify-center">
                  <Camera className="h-24 w-24 text-gray-600" />
                </div>
                {/* Face detection overlay */}
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/50"></div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  onClick={() => handleVerifyFace(currentStep === 'party1-face' ? 'party1' : 'party2')}
                  className="w-full bg-[#af47ff] hover:bg-[#9333ea]"
                  size="lg"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Verify Face
                </Button>
                <Button 
                  onClick={handleNextStep}
                  variant="outline"
                  className="w-full"
                >
                  Skip Verification
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 4 & 5: Signature */}
        {(currentStep === 'party1-signature' || currentStep === 'party2-signature') && (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="mb-2">
                  {currentStep === 'party1-signature' ? contractData.party1Name : contractData.party2Name} Signature
                </h3>
                <p className="text-gray-600">
                  Draw your signature in the box below
                </p>
              </div>

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
                  onClick={() => saveSignature(currentStep === 'party1-signature' ? 'party1' : 'party2')}
                  className="flex-1 bg-[#af47ff] hover:bg-[#9333ea]"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Save Signature
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 6: Review */}
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
              <h3 className="mb-4">Parties</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Label>Party 1</Label>
                    <p>{contractData.party1Name}</p>
                    {contractData.party1Company && (
                      <p className="text-gray-600">{contractData.party1Company}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={party1FaceVerified ? 'bg-green-500' : 'bg-gray-400'}>
                      {party1FaceVerified ? 'Face Verified' : 'Not Verified'}
                    </Badge>
                    <Badge className={party1Signature ? 'bg-green-500' : 'bg-gray-400'}>
                      {party1Signature ? 'Signed' : 'Not Signed'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <Label>Party 2</Label>
                    <p>{contractData.party2Name}</p>
                    {contractData.party2Company && (
                      <p className="text-gray-600">{contractData.party2Company}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={party2FaceVerified ? 'bg-green-500' : 'bg-gray-400'}>
                      {party2FaceVerified ? 'Face Verified' : 'Not Verified'}
                    </Badge>
                    <Badge className={party2Signature ? 'bg-green-500' : 'bg-gray-400'}>
                      {party2Signature ? 'Signed' : 'Not Signed'}
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
