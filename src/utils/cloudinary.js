export const uploadImage = async (file) => {
  try {
    if (!file) {
      throw new Error("No file selected");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "coaching"); // Set your Cloudinary upload preset
    // formData.append("folder", "nextjs_uploads"); // Optional: Folder to store images

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dbnpro0nt/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Image Upload Error:", error);
    return null;
  }
};
