import axios from "axios";

export const pinImg = async (name, selectedFile) => {
  const APIKey = "26ffdff945947de137f5";
  const APISecret =
    "7b40c2eb5ef61b2b7036d793c1b744d4ad9e9801551e0f5a04c7c4f2669ce12a";

  const publicGateway = "https://gateway.pinata.cloud/ipfs/";
  const formData = new FormData();

  console.log(name, selectedFile);

  formData.append("file", selectedFile);

  const metadata = JSON.stringify({
    name: name,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",

        headers: {
          "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
          pinata_api_key: APIKey,
          pinata_secret_api_key: APISecret,
        },
      }
    );

    console.log(publicGateway + res.data.IpfsHash);
    return publicGateway + res.data.IpfsHash;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const pinMetadata = async (name, file) => {
  const APIKey = "26ffdff945947de137f5";
  const APISecret =
    "7b40c2eb5ef61b2b7036d793c1b744d4ad9e9801551e0f5a04c7c4f2669ce12a";

  const publicGateway = "https://gateway.pinata.cloud/ipfs/";
  const formData = new FormData();

  const data = JSON.stringify(file);

  try {
    let config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: APIKey,
        pinata_secret_api_key: APISecret,
      },
      data: data,
    };

    const res = await axios(config);

    console.log(publicGateway + res.data.IpfsHash, "ok");
    return publicGateway + res.data.IpfsHash;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const configPinata = async () => {
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZjZmMGY3My1iY2VjLTQyYWEtYjFkZi0xMmUyY2FmZGEwNTkiLCJlbWFpbCI6ImFyaWFud2ViMy5kZXZlbG9wZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI2ZmZkZmY5NDU5NDdkZTEzN2Y1Iiwic2NvcGVkS2V5U2VjcmV0IjoiN2I0MGMyZWI1ZWY2MWIyYjcwMzZkNzkzYzFiNzQ0ZDRhZDllOTgwMTU1MWUwZjVhMDRjN2M0ZjI2NjljZTEyYSIsImlhdCI6MTY3OTM5ODAxOH0.1kACxfV2YSCHIdNOtLnekJvs8TsSvBGEHwmP0Q3zLXc";

  let config = {
    method: "get",
    url: "https://api.pinata.cloud/data/testAuthentication",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  };
  const res = await axios(config);
  console.log(res);
};
