import axios from "axios";

export default function ManageAccess() {
  let [data, setData] = useState(false);
  useEffect(async () => {
    try {
      let res = await axios.get("/listUsers", {
        headers: { Authorization: localStorage.getItem("JWT") },
      });
      if (res.status == 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
}
