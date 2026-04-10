import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-96" />
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-md bg-card">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Profile Photo Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-xl bg-muted/30 border border-dashed">
                <Skeleton className="h-28 w-28 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Skeleton className="h-11 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-muted/30">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <Skeleton className="h-px w-full" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-4 w-4 mt-0.5" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Skeleton className="h-4 w-4 mt-0.5" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Skeleton className="h-9 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}