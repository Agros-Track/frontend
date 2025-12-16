import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface GrafanaDashboardProps {
  title?: string;
  url: string;
  height?: string;
  className?: string;
}

export function GrafanaDashboard({ 
  title = "Dashboard", 
  url, 
  height = "600px",
  className = "" 
}: GrafanaDashboardProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0 relative">
        {loading && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10"
            style={{ height }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <iframe
          src={url}
          width="100%"
          height={height}
          frameBorder="0"
          onLoad={() => setLoading(false)}
          className="rounded-b-lg"
          title={title}
        />
      </CardContent>
    </Card>
  );
}
