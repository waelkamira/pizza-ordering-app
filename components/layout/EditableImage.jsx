import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function EditableImage({ routeName, props, setProps }) {
  const session = useSession();
  const { status, data } = session;
  const [imageData, setImageData] = useState(' ');
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchedProfile, setFetchedProfile] = useState(false);

  useEffect(() => {
    // console.log('useEffect');
    fetchData();
  }, [imageData]);

  //! this function to fetch data from mongodb
  const fetchData = async () =>
    fetch(`/api/profile`).then((res) =>
      res.json().then((res) => {
        console.log('this res from useEffect:', res);
        setIsAdmin(res?.admin);
        setFetchedProfile(true);
        // setImageData(res?.image);
      })
    );

  async function handleFileChange(e) {
    const files = e.target.files;
    const formData = new FormData();
    formData.set('file', files[0]);
    formData.set('upload_preset', 'dq8dx63w');

    const imagePost = async () => {
      try {
        //! this function for upload image to cloudinary server
        const promise = new Promise(async (resolve, reject) => {
          const response = await axios
            .post('https://api.cloudinary.com/v1_1/dh2xlutfu/upload', formData)
            .then((res) => {
              //! this function for sending changed image to mongodb
              async function sendChangedImage() {
                const imagePublic_id = res?.data?.public_id;
                // console.log('this is imagePublic_id: ', imagePublic_id);
                await fetch(`/api/profile`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    image: imagePublic_id,
                    email: props.email,
                  }),
                  headers: { 'Content-Type': 'application/json' },
                });

                setImageData(imagePublic_id);
              }

              sendChangedImage();
            });
          if (response) {
            resolve();
          } else {
            reject();
          }
        });

        toast.promise(promise, {
          loading: 'Uploading Image',
          success: 'Image Uploaded',
          error: 'Sorry Something Went Wrong',
        });
        location.reload();
      } catch (error) {
        console.log(error);
      }
    };
    imagePost();
  }

  console.log('props from EditableImage', imageData);
  return (
    <div className="flex flex-col py-3 px-3  bg-gray-500 rounded-lg ">
      <div className="flex justify-center items-center mb-2 border border-orange-300 rounded-lg  p-2">
        <CldImage
          src={`/${props.image}`}
          alt="avatar"
          width={100}
          height={100}
          sizes="100vw"
          priority
          className="h-[80px] w-[80px] object-cover object-bottom  rounded-lg"
        ></CldImage>
      </div>

      <label className="mx-6">
        <input className="hidden" type="file" onChange={handleFileChange} />
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl text-white whitespace-nowrap">
            {props.name}
          </div>
          <span className="text-lg bg-primary cursor-pointer border border-gray-400 text-white rounded-lg py-1 px-4">
            Edit
          </span>
        </div>
      </label>
    </div>
  );
}
