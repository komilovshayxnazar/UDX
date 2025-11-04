import { ArrowLeft, FileText, FolderOpen, Camera, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface AddContractOptionsScreenProps {
  onBack: () => void;
  onCreateNew: () => void;
  onCreateMultiDevice: () => void;
  onSelectFromFiles: () => void;
  onTakePicture: () => void;
}

export function AddContractOptionsScreen({ 
  onBack, 
  onCreateNew,
  onCreateMultiDevice, 
  onSelectFromFiles, 
  onTakePicture 
}: AddContractOptionsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#af47ff] to-[#8b2dd1] px-4 py-6 text-white">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-white">Add Contract</h2>
            <p className="text-white/80">Choose how to add your contract</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="px-4 py-6 space-y-4">
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={onCreateNew}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#af47ff]/10">
              <FileText className="h-7 w-7 text-[#af47ff]" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Create New Contract</h3>
              <p className="text-gray-600">
                Create and sign a contract on a single device
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-[#af47ff]/30"
          onClick={onCreateMultiDevice}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#af47ff]/10">
              <Users className="h-7 w-7 text-[#af47ff]" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Multi-Device Contract</h3>
              <p className="text-gray-600">
                Each party signs from their own device with face verification
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={onSelectFromFiles}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
              <FolderOpen className="h-7 w-7 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Select from Files</h3>
              <p className="text-gray-600">
                Upload an existing contract from your device
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={onTakePicture}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
              <Camera className="h-7 w-7 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Take a Picture</h3>
              <p className="text-gray-600">
                Scan a physical contract using your camera
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
