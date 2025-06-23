import React, { useState, useRef, useCallback } from 'react'
import { Camera, Upload, RotateCcw, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'

export default function SkinScan() {
  const [scanning, setScanning] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions or try uploading an image.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg')
        setCapturedImage(imageData)
        stopCamera()
        performAnalysis(imageData)
      }
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setCapturedImage(imageData)
        performAnalysis(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const performAnalysis = async (imageData: string) => {
    setScanning(true)
    
    // Simulate AI analysis with realistic results
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const mockAnalysis = {
      skinType: ['Combination', 'Oily', 'Dry', 'Normal', 'Sensitive'][Math.floor(Math.random() * 5)],
      concerns: [
        'Mild acne',
        'Dark spots',
        'Fine lines',
        'Dry patches',
        'Enlarged pores'
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      skinScore: Math.floor(Math.random() * 30) + 70,
      recommendations: {
        products: [
          'Gentle foaming cleanser',
          'Niacinamide serum',
          'Hyaluronic acid moisturizer',
          'SPF 30+ sunscreen'
        ],
        treatments: [
          'Chemical exfoliation 2x/week',
          'Face mask 1x/week',
          'Professional facial monthly'
        ],
        homeRemedies: [
          'Green tea compress for inflammation',
          'Honey mask for hydration',
          'Oatmeal scrub for gentle exfoliation'
        ],
        doctorConsultation: Math.random() > 0.7
      },
      confidenceScore: Math.floor(Math.random() * 15) + 85
    }
    
    setAnalysisResult(mockAnalysis)
    setScanning(false)
  }

  const resetScan = () => {
    setAnalysisResult(null)
    setCapturedImage(null)
    stopCamera()
  }

  if (analysisResult) {
    return (
      <div className="max-w-4xl mx-auto pb-20 md:pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Skin Analysis Results
            </h1>
            <button
              onClick={resetScan}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Scan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image and Score */}
            <div>
              {capturedImage && (
                <div className="mb-6">
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full max-w-md mx-auto rounded-lg border-4 border-pink-100"
                  />
                </div>
              )}
              
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white text-center">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Skin Health Score</h3>
                <div className="text-4xl font-bold mb-2">{analysisResult.skinScore}/100</div>
                <p className="text-pink-100">
                  {analysisResult.skinScore >= 80 ? 'Excellent!' : 
                   analysisResult.skinScore >= 60 ? 'Good progress!' : 'Needs attention'}
                </p>
                <div className="mt-4 text-sm text-pink-100">
                  Confidence: {analysisResult.confidenceScore}%
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="space-y-6">
              {/* Skin Type */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Skin Type</h3>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-lg font-medium text-gray-700">{analysisResult.skinType}</span>
                </div>
              </div>

              {/* Concerns */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Identified Concerns</h3>
                <div className="space-y-2">
                  {analysisResult.concerns.map((concern: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-700">{concern}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommended Products</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    {analysisResult.recommendations.products.map((product: string, index: number) => (
                      <li key={index}>• {product}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Home Remedies</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    {analysisResult.recommendations.homeRemedies.map((remedy: string, index: number) => (
                      <li key={index}>• {remedy}</li>
                    ))}
                  </ul>
                </div>

                {analysisResult.recommendations.doctorConsultation && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Professional Consultation</h4>
                    <p className="text-sm text-red-700">
                      We recommend consulting with a dermatologist for personalized treatment options.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200">
              Shop Recommended Products
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
              Book Consultation
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
              Save Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          AI Skin Analysis
        </h1>
        <p className="text-gray-600 text-lg">
          Get personalized skincare recommendations with our advanced AI technology
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {!cameraActive && !capturedImage && !scanning && (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Scan?</h2>
              <p className="text-gray-600">
                Choose how you'd like to capture your skin for analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button
                onClick={startCamera}
                className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
              >
                <Camera className="w-5 h-5" />
                <span>Use Camera</span>
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Photo</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="text-sm text-gray-500 max-w-md mx-auto">
              <p className="mb-2">For best results:</p>
              <ul className="text-left space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Remove makeup if possible</li>
                <li>• Face the camera directly</li>
                <li>• Keep face centered in frame</li>
              </ul>
            </div>
          </div>
        )}

        {cameraActive && (
          <div className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md mx-auto rounded-lg border-4 border-pink-100"
              />
              <div className="absolute inset-0 border-2 border-dashed border-pink-300 rounded-lg pointer-events-none flex items-center justify-center">
                <div className="w-48 h-56 border-2 border-pink-400 rounded-lg"></div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={capturePhoto}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
              >
                Capture Photo
              </button>
              <button
                onClick={stopCamera}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {scanning && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Your Skin...</h2>
              <p className="text-gray-600">
                Our AI is processing your image to provide personalized recommendations
              </p>
            </div>

            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>

            <p className="text-sm text-gray-500">This may take a few moments...</p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}