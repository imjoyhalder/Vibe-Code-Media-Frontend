// "use client";

// import { useEffect, useState, type FormEvent } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User, Mail, Edit, UploadCloud } from "lucide-react";
// import { userService } from "@/services/user/user.service";
// import type { UserProfile } from "@/services/user/user.types";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadProfile = async () => {
//       const result = await userService.getProfile();
//       if (result.error) {
//         setError(result.error);
//       } else {
//         setProfile(result.data);
//         setName(result.data?.name || "");
//         setBio(result.data?.bio || "");
//       }
//       setLoading(false);
//     };

//     loadProfile();
//   }, []);

//   useEffect(() => {
//     if (avatarFile) {
//       const url = URL.createObjectURL(avatarFile);
//       setAvatarPreview(url);
//       return () => URL.revokeObjectURL(url);
//     }

//     setAvatarPreview(profile?.avatarUrl || "");
//   }, [avatarFile, profile]);

//   const handleSave = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setSaving(true);
//     setError("");
//     setMessage("");

//     const formData = new FormData();
//     formData.append("name", name.trim());
//     formData.append("bio", bio.trim());
//     if (avatarFile) {
//       formData.append("avatar", avatarFile);
//     }

//     const result = await userService.updateProfile(avatarFile ? formData : { name, bio });
//     if (result.error) {
//       setError(result.error);
//     } else {
//       setProfile(result.data);
//       setAvatarFile(null);
//       setMessage("Profile updated successfully.");
//     }

//     setSaving(false);
//   };

//   const initials = profile?.name
//     ? profile.name
//         .split(" ")
//         .map((part) => part[0])
//         .slice(0, 2)
//         .join("")
//         .toUpperCase()
//     : "US";

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
//         <p className="text-muted-foreground max-w-2xl">
//           Keep your account information fresh and let people know who you are.
//         </p>
//       </div>

//       {error ? (
//         <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       ) : null}
//       {message ? (
//         <div className="rounded-2xl border border-success/20 bg-success/5 p-4 text-sm text-success">
//           {message}
//         </div>
//       ) : null}

//       <form onSubmit={handleSave} className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="h-5 w-5" />
//               Profile Information
//             </CardTitle>
//             <CardDescription>Update your name, bio, and account details.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//               <div className="relative">
//                 <Avatar className="h-20 w-20">
//                   {avatarPreview ? (
//                     <AvatarImage src={avatarPreview} />
//                   ) : (
//                     <AvatarFallback>{initials}</AvatarFallback>
//                   )}
//                 </Avatar>
//                 <label className="absolute -bottom-1 right-0 inline-flex cursor-pointer items-center rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-900">
//                   <UploadCloud className="mr-1 h-4 w-4" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}
//                   />
//                 </label>
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-slate-900">{profile?.name || "Loading..."}</p>
//                 <p className="text-sm text-muted-foreground">{profile?.email || "No email set"}</p>
//                 <p className="text-sm text-muted-foreground">{profile?.bio || "Update your bio to help others learn more about you."}</p>
//               </div>
//             </div>

//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   value={name}
//                   onChange={(event) => setName(event.target.value)}
//                   disabled={loading}
//                 />
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" value={profile?.email || ""} disabled />
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="bio">Bio</Label>
//                 <Textarea
//                   id="bio"
//                   value={bio}
//                   onChange={(event) => setBio(event.target.value)}
//                   placeholder="Tell people what you build and why."
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <Button type="submit" disabled={saving || loading}>
//               <Edit className="h-4 w-4 mr-2" />
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Mail className="h-5 w-5" />
//               Account Summary
//             </CardTitle>
//             <CardDescription>Quick profile health and account stats.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
//               <p className="text-sm text-muted-foreground">Joined</p>
//               <p className="mt-1 text-lg font-semibold text-slate-900">
//                 {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "--"}
//               </p>
//             </div>
//             <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
//               <p className="text-sm text-muted-foreground">Bio status</p>
//               <p className="mt-1 text-lg font-semibold text-slate-900">
//                 {profile?.bio ? "Completed" : "Add a short bio"}
//               </p>
//             </div>
//             <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
//               <p className="text-sm text-muted-foreground">Profile visibility</p>
//               <p className="mt-1 text-lg font-semibold text-slate-900">Public by default</p>
//             </div>
//           </CardContent>
//         </Card>
//       </form>
//     </div>
//   );
// }


"use client";

import { useEffect, useState, type FormEvent, useCallback } from "react";
import Cropper from "react-easy-crop"; // Install this: npm install react-easy-crop
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // Added missing import
import { 
  User, Mail, Camera, Save, CalendarDays, 
  BadgeCheck, Loader2, AlertCircle, X, Check 
} from "lucide-react";
import { userService } from "@/services/user/user.service";
import type { UserProfile } from "@/services/user/user.types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --- Image & Crop States ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const result = await userService.getProfile();
      if (!result.error) {
        setProfile(result.data);
        setName(result.data?.name || "");
        setBio(result.data?.bio || "");
        setAvatarPreview(result.data?.avatarUrl || "");
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  // --- Crop Logic ---
  const onCropComplete = useCallback((_area: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSelectedImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImg = async () => {
    try {
      const image = new Image();
      image.src = selectedImage!;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx?.drawImage(
        image,
        croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0, croppedAreaPixels.width, croppedAreaPixels.height
      );

      return new Promise<File>((resolve) => {
        canvas.toBlob((blob) => {
          const file = new File([blob!], "avatar.jpg", { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg");
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const applyCrop = async () => {
    const croppedFile = await getCroppedImg();
    if (croppedFile) {
      setAvatarFile(croppedFile);
      setAvatarPreview(URL.createObjectURL(croppedFile));
      setSelectedImage(null); // Close cropper
    }
  };

  // --- Save Function ---
  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("bio", bio.trim());
    if (avatarFile) formData.append("avatar", avatarFile);

    const result = await userService.updateProfile(avatarFile ? formData : { name, bio });
    
    if (result.error) {
      setError(result.error);
    } else {
      setProfile(result.data);
      setAvatarFile(null);
      setMessage("Profile updated successfully!");
    }
    setSaving(false);
  };

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      <h1 className="text-3xl font-extrabold">Account Settings</h1>

      {/* Image Cropper Modal overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-lg h-[400px] bg-card rounded-xl overflow-hidden">
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-4 flex gap-4 w-full max-w-lg">
            <Button variant="outline" className="flex-1 bg-white text-black" onClick={() => setSelectedImage(null)}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button className="flex-1" onClick={applyCrop}>
              <Check className="mr-2 h-4 w-4" /> Apply Crop
            </Button>
          </div>
          <div className="mt-4 w-full max-w-xs">
             <Label className="text-white text-xs mb-2 block">Zoom</Label>
             <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="grid gap-8 md:grid-cols-12">
        <Card className="md:col-span-8 border-border/50 shadow-sm">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Profile Info</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            {/* Avatar Section */}
            <div className="flex items-center gap-6 pb-6 border-b">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-background shadow-xl ring-2 ring-primary/10">
                  <AvatarImage src={avatarPreview} className="object-cover" />
                  <AvatarFallback className="text-xl font-bold">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera className="h-6 w-6" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              <div>
                <h4 className="font-bold">Profile Picture</h4>
                <p className="text-xs text-muted-foreground">Click image to change and crop.</p>
                {avatarFile && <Badge className="mt-2 bg-emerald-500/10 text-emerald-500">Ready to save</Badge>}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile?.email || ""} disabled className="bg-muted" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="min-h-[100px]" />
              </div>
            </div>

            <Button type="submit" disabled={saving} className="w-full sm:w-auto px-8 rounded-full shadow-lg">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Sidebar Stats */}
        <div className="md:col-span-4 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader><CardTitle className="text-sm font-bold uppercase text-muted-foreground">Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Joined</p>
                  <p className="text-sm font-bold">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "--"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border">
                <BadgeCheck className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Status</p>
                  <p className="text-sm font-bold">Verified User</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}