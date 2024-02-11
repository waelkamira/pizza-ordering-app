// export async function POST(req) {
//   const data = await req.formData();

//   console.log('uploaded');
//   console.log(data.get('file'));
// if(!data.get("file"){
//     return Response.json("failed to upload image",{
//         status:400
//     })
// }
//   return Response.json('uploaded');
// }

// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dh2xlutfu',
//   api_key: '229764599238349',
//   api_secret: 'g0MbmynCpsDNUnHu1kVKVS7UTb0',
// });

// cloudinary.uploader.upload(
//   'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
//   { public_id: 'olympic_flag' },
//   function (error, result) {
//     console.log(result);
//   }
// );
