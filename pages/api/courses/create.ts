import type { NextApiRequest, NextApiResponse } from "next";

const handleCreate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    console.log("API request worked!");
    console.log({ req });
    return res.status(200).json({ message: "It worked" });
  } else {
    console.log(`Requested with method: ${req.method}`);
    return res
      .status(500)
      .json({ error: "Something went wrong!" });
  }
};

export default handleCreate;
