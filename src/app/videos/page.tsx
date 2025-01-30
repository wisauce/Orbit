"use client"
import { useState, useEffect } from "react";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader, AlertCircle, CheckCircle } from "lucide-react";
import { useRef } from "react";

interface Video {
  id: string;
  url: string;
  name: string;
}

const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      setVideos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Video)));
      setSuccess("Videos loaded successfully!");
    } catch (err) {
      setError("Failed to load videos.");
    } finally {
      setLoading(false);
    }
  };

  const addVideo = async (file: File | null) => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error(error);
          setError("Upload failed.");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "videos"), { url: downloadURL, name: file.name });
          setSuccess("Video uploaded successfully!");
          fetchVideos();
        }
      );
    } catch (err) {
      setError("Failed to upload video.");
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id: string, fileName: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await deleteDoc(doc(db, "videos", id));
      await deleteObject(ref(storage, `videos/${fileName}`));
      setSuccess("Video deleted successfully!");
      fetchVideos();
    } catch (err) {
      setError("Failed to delete video.");
    } finally {
      setLoading(false);
    }
  };

  return { videos, addVideo, deleteVideo, fetchVideos, loading, error, success };
};

export default function Videos() {
  const { videos, addVideo, deleteVideo, fetchVideos, loading, error, success } = useVideos();
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Video Manager</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <Input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border rounded-lg p-2 w-full" />
        <Button onClick={() => addVideo(file)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Upload"}
        </Button>
        <Button onClick={fetchVideos} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600" disabled={loading}>
          Refresh
        </Button>
      </div>
      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 flex items-center gap-2"><AlertCircle /> {error}</p>}
      {success && <p className="text-green-500 flex items-center gap-2"><CheckCircle /> {success}</p>}
      <div className="grid grid-cols-1 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <CardContent>
              <video loop controls autoPlay className="w-full rounded-lg">
                <source src={video.url} type="video/mp4" />
              </video>
              <p className="text-sm mt-2 font-semibold text-gray-700">{video.name}</p>
              <Button variant="destructive" onClick={() => deleteVideo(video.id, video.name)} className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600" disabled={loading}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
