import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function EditableImage({ props, routeProp }) {
  const session = useSession();
  const [imageData, setImageData] = useState(' ');
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchedProfile, setFetchedProfile] = useState(false);
  console.log(props.email);
  useEffect(() => {
    fetchData();
  }, []);

  //! this function to fetch data from mongodb
  const fetchData = async () =>
    fetch(`/api/${routeProp}`).then((res) =>
      res.json().then((res) => {
        setIsAdmin(res?.admin);
        setFetchedProfile(true);
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
                console.log('this is imagePublic_id: ', imagePublic_id);
                await fetch(`/api/${routeProp}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    image: imagePublic_id,
                    email: props.email,
                    _id: props._id,
                  }),
                  headers: { 'Content-Type': 'application/json' },
                });

                setImageData(imagePublic_id);
                if (imagePublic_id) {
                  resolve();
                  location.reload();
                } else {
                  reject();
                }
              }

              sendChangedImage();
            });
        });

        toast.promise(promise, {
          loading: 'Uploading Image',
          success: 'Image Uploaded',
          error: 'Sorry Something Went Wrong',
        });
      } catch (error) {
        console.log(error);
      }
    };
    imagePost();
  }

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
          <h1 className="text-xl text-white whitespace-nowrap w-20 truncate text-center">
            {props.name}
          </h1>
          <span className="text-lg bg-primary cursor-pointer border border-gray-400 text-white rounded-lg py-1 px-4">
            Edit
          </span>
        </div>
      </label>
    </div>
  );
}
