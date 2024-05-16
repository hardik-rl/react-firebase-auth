import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";

const firestore = getFirestore(app);

export function Home() {
  const [data, setData] = useState();
  const getSliderCollection = async () => {
    const sliderCollectionRef = collection(firestore, "slider");
    const querySnapshot = await getDocs(sliderCollectionRef);
    const sliderData = [];
    querySnapshot.forEach((doc) => {
      sliderData.push({ id: doc.id, ...doc.data() });
    });
    setData(sliderData);
  };

  useEffect(() => {
    getSliderCollection();
  }, []);

  console.log(data);

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      {data && (
        <Carousel>
          {data.map((item) => (
            <div key={item.id}>
              <p>{item.caption}</p>
              <img
                src={item.img}
                alt=""
                className="w-full h-[500px] object-cover"
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
