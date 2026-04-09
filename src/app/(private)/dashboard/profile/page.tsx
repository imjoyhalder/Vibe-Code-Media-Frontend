"use client";

import { useEffect, useState, type FormEvent, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User, Mail, Camera, Save, CalendarDays,
  BadgeCheck, Loader2, AlertCircle, X, Check, ShieldCheck, Globe
} from "lucide-react";
import { userService } from "@/services/user/user.service";
import type { UserProfile } from "@/services/user/user.types";
import { toast } from "sonner"; // Recommended for professional notifications

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      if (!result.error && result.data) {
        setProfile(result.data);
        setName(result.data.name || "");
        setBio(result.data.bio || "");
        setAvatarPreview(result.data.avatarUrl || "");
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

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
      canvas.width = 400; // Standardize resolution
      canvas.height = 400;

      ctx?.drawImage(
        image,
        croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0, 400, 400
      );

      return new Promise<File>((resolve) => {
        canvas.toBlob((blob) => {
          const file = new File([blob!], "avatar.jpg", { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg", 0.9);
      });
    } catch (e) {
      return null;
    }
  };

  const applyCrop = async () => {
    const croppedFile = await getCroppedImg();
    if (croppedFile) {
      setAvatarFile(croppedFile);
      setAvatarPreview(URL.createObjectURL(croppedFile));
      setSelectedImage(null);
      toast.success("Image cropped successfully!");
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("bio", bio.trim());
    if (avatarFile) formData.append("avatar", avatarFile);

    // Using either FormData or regular object based on avatarFile presence
    const result = await userService.updateProfile(avatarFile ? formData : { name, bio });

    if (result.error) {
      toast.error(result.error);
    } else {
      setProfile(result.data);
      setAvatarFile(null);
      toast.success("Profile updated successfully");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 animate-in fade-in duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and account preferences.</p>
      </header>

      {/* Modern Modal Overlay for Cropper */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <Card className="w-full max-w-2xl overflow-hidden shadow-2xl border-primary/20">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-lg">Crop Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full h-[350px] bg-neutral-900">
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
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Zoom Level</Label>
                    <span className="text-muted-foreground">{zoom.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" min={1} max={3} step={0.1} value={zoom} 
                    onChange={(e) => setZoom(Number(e.target.value))} 
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="ghost" onClick={() => setSelectedImage(null)}>Cancel</Button>
                  <Button onClick={applyCrop} className="px-8">Save Image</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-md bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>Update your photo and personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Profile Photo Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-xl bg-muted/30 border border-dashed">
                <div className="relative group shrink-0">
                  <Avatar className="h-28 w-28 border-4 border-background shadow-2xl">
                    <AvatarImage src={avatarPreview} className="object-cover" />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300">
                    <div className="flex flex-col items-center gap-1">
                      <Camera className="h-6 w-6" />
                      <span className="text-[10px] font-medium">Edit</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Your Photo</h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    This will be displayed on your profile and project cards. JPG or PNG, max 2MB.
                  </p>
                  {avatarFile && (
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Check className="h-4 w-4" />
                      <span className="text-xs font-medium">Image ready to upload</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="e.g. John Doe"
                      className="bg-muted/20 focus-visible:ring-primary"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        value={profile?.email || ""} 
                        disabled 
                        className="pl-10 bg-muted/50 cursor-not-allowed opacity-80" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="bio" className="text-sm font-semibold">Short Bio</Label>
                    <span className="text-[10px] text-muted-foreground">{bio.length}/160 characters</span>
                  </div>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder="Tell us about yourself..."
                    className="min-h-[120px] bg-muted/20 resize-none focus-visible:ring-primary"
                    maxLength={160}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={saving} 
                  className="w-full sm:w-auto px-10 h-11 font-semibold rounded-lg shadow-lg shadow-primary/20"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">Identity</span>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                  Verified
                </Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Visibility</p>
                    <p className="text-sm text-muted-foreground">Public profile active</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full text-xs h-9" type="button">
                  View Public Profile
                </Button>
              </div>
            </CardContent>
          </Card>

     
        </div>
      </form>
    </div>
  );
}