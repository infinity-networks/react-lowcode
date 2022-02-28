import axios from "axios";

export default function () {
  const loadManifest = async (url: string) => {
    const res = await axios.get(url).then((res) => res.data);
    return res;
  };
}
