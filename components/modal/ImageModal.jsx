import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"



export function ImageModal({ image, index }) {
  return (
    <Dialog DialogTitle="Generated Image" className="w-full">
      <DialogTrigger asChild>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-800 cursor-pointer">
          <img
            src={image.imageUrl || "/placeholder.svg"}
            alt={`Generated Image ${index + 1}`}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Prompt: <span className="font-medium">{image.prompt}</span>
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full p-0" DialogTitle="Generated Image">
        <div className="relative">
          <img
            src={image.imageUrl || "/placeholder.svg"}
            alt={`Full size generated image for: ${image.prompt}`}
            className="w-full h-auto"
          />
          <Button
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
            onClick={() => document.querySelector("dialog")?.close()}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Prompt: <span className="font-medium">{image.prompt}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

