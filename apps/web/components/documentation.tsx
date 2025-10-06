'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function Documentation() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="documentation" className="border-border container border-t py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Quick Start Guide</h2>
          <p className="text-muted-foreground text-balance text-lg">
            Get up and running in minutes with our simple REST API
          </p>
        </div>

        <Card className="p-8">
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>

            <TabsContent value="javascript" className="mt-6">
              <div className="relative">
                <pre className="bg-muted overflow-x-auto rounded-lg p-6">
                  <code className="text-foreground font-mono text-sm">{`// Fetch a random urban legend
fetch('https://api.urbanlegends.dev/v1/legends/random')
  .then(response => response.json())
  .then(data => {
    console.log(data.title);
    console.log(data.story);
    console.log(data.origin);
  })
  .catch(error => console.error('Error:', error));`}</code>
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-4"
                  onClick={() =>
                    copyToClipboard(`fetch('https://api.urbanlegends.dev/v1/legends/random')
  .then(response => response.json())
  .then(data => {
    console.log(data.title);
    console.log(data.story);
    console.log(data.origin);
  })
  .catch(error => console.error('Error:', error));`)
                  }
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="python" className="mt-6">
              <div className="relative">
                <pre className="bg-muted overflow-x-auto rounded-lg p-6">
                  <code className="text-foreground font-mono text-sm">{`import requests

# Fetch a random urban legend
response = requests.get('https://api.urbanlegends.dev/v1/legends/random')
data = response.json()

print(data['title'])
print(data['story'])
print(data['origin'])`}</code>
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-4"
                  onClick={() =>
                    copyToClipboard(`import requests

response = requests.get('https://api.urbanlegends.dev/v1/legends/random')
data = response.json()

print(data['title'])
print(data['story'])
print(data['origin'])`)
                  }
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="curl" className="mt-6">
              <div className="relative">
                <pre className="bg-muted overflow-x-auto rounded-lg p-6">
                  <code className="text-foreground font-mono text-sm">{`curl -X GET "https://api.urbanlegends.dev/v1/legends/random" \\
     -H "Accept: application/json"`}</code>
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-4"
                  onClick={() =>
                    copyToClipboard(
                      `curl -X GET "https://api.urbanlegends.dev/v1/legends/random" -H "Accept: application/json"`,
                    )
                  }
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
