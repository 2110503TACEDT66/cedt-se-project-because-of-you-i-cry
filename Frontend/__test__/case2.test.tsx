import { CampgroundJson } from "../interface";
import fetch from "node-fetch"; // Import node-fetch

export default async function getCampgrounds(): Promise<CampgroundJson> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    "https://project-backend-eight.vercel.app/api-informations/campgrounds"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch campgrounds");
  }
  return (await response.json()) as Promise<CampgroundJson>; // Specify return type explicitly
}

// Mock data for testing
const mockCampgroundData: CampgroundJson = {
  success: true,
  count: 6,
  pagination: {},
  data: [
    {
      _id: "6601a128c6b2856572788642",
      name: "Camp Meating Hub",
      address: "San Phak Wan",
      district: "Mueang Chiang Mai",
      province: "Chiang Mai",
      region: "Thailand",
      postalcode: "50000",
      tel: "0800505900",
      url: "https://www.chiangmaicitylife.com/clg/see-do/outdoor-life/camp-meating-hidden-camp-of-chiang-mai/",
      maxReservations: 5,
      coverpicture:
        "https://drive.google.com/uc?id=1QE7zriq5cZ5I0zDst7rooBwdjjKVspSK",
      picture: [
        "https://drive.google.com/uc?id=1XR5aVCCIxxc_OdEUNJgZk1v-LziLd2eA",
        "https://drive.google.com/uc?id=14_ndF0r3JzgQYmydtjuxrfBsuhlLRux0",
        "https://drive.google.com/uc?id=1wie8MjGFHHRzxDPCY5PFtoMLJFy9pATK",
        "https://drive.google.com/uc?id=1Oi79UN_Y3Xt1Qka44hGFbI_R_ALn5FVv",
        "https://drive.google.com/uc?id=1YmP5s6oK4DFm-Hq2dLyDEQIu6OQT_cff",
      ],
      description:
        "Ex corporis sint dolorum in omnis. Ut maxime harum quam in recusandae itaque quo. Deleniti et accusantium dolorem quo.",

      price: 1000,
      rating: 5,

      id: "6601a128c6b2856572788642",
    },
    {
      _id: "6601b970c6b2856572788656",
      name: "Hintok River Camp",
      address: "Mae Sa",
      district: "Mueang",
      province: "Mae Hong Son",
      region: "Thailand",
      postalcode: "58000",
      tel: "0626425497",
      url: "https://www.hintokrivercamp.com/th/",
      maxReservations: 5,
      coverpicture:
        "https://drive.google.com/uc?id=1UfvfOeP6W5rolvMCzKPoKVoQ3HC7dsR5",
      picture: [
        "https://drive.google.com/uc?id=1Q6dxrXXi52_vITxsM3xpA1bAiaxbnxsh",
        "https://drive.google.com/uc?id=14tShrCE6kkmHqjdXKtdp0BttV5Qo3hEV",
        "https://drive.google.com/uc?id=1cPN2KxJExjck-v6gAI-PaYnLUtoIQqKG",
        "https://drive.google.com/uc?id=1Vx7XOMngBGSvHcPPZspCYpYpxeTv21Sb",
        "https://drive.google.com/uc?id=1Yv7XyyuGcq0UvcBUlT6vjjrjfnncwiHN",
      ],
      description:
        "Ipsam facilis sunt quae maxime sed eum atque. Ut ut consequatur soluta magni sunt fugit sunt. Ut ipsum quis. Quo corporis numquam iure enim culpa. Sunt voluptatibus animi sed qui ea.",

      price: 1650,
      rating: 3,

      id: "6601b970c6b2856572788656",
    },
    {
      _id: "6601ac47c6b285657278864d",
      name: "Khao Sok Riverside Cottages",
      address: "Kanchanadit",
      district: "Krabi",
      province: "Krabi",
      region: "Thailand",
      postalcode: "81130",
      tel: "0836657210",
      url: "https://www.khao-sok-riverside-cottages.com/",
      maxReservations: 5,
      coverpicture:
        "https://drive.google.com/uc?id=1MBM6zvahIoVPPmFwOZnpHE4cGjHHHDIM",
      picture: [
        "https://drive.google.com/uc?id=1GVHgIx2vnVyR9tT0FBIrTIpuUghkNfiL",
        "https://drive.google.com/uc?id=1dDlAQba6Jo1RwV97PHFTTPZ_4OKs-lEV",
        "https://drive.google.com/uc?id=12VIbqwATU97ED3LOt9uI7RdNd0XbkrlJ",
        "https://drive.google.com/uc?id=1c_glH9akmvIOW4Fr2kP3GGN1HoW-kv7p",
        "https://drive.google.com/uc?id=1oavNpehfe0NPdN1ulQ0sIhFv32bEd-dD",
      ],
      description:
        "Perspiciatis quaerat deserunt ratione occaecati commodi et nisi temporibus nihil. Dolores voluptatem suscipit repellat non. Laboriosam repudiandae porro nisi fugit voluptatem expedita fuga qui. Facilis sed impedit totam cupiditate est laudantium.",

      price: 4000,
      rating: 2,

      id: "6601ac47c6b285657278864d",
    },
    {
      _id: "6601bad7c6b2856572788659",
      name: "Pai Village Boutique Resort &amp; Farm",
      address: "Pai",
      district: "Pai",
      province: "Mae Hong Son",
      region: "Thailand",
      postalcode: "58130",
      tel: "0653698125",
      url: "https://www.paivillage.com/",
      maxReservations: 5,
      coverpicture:
        "https://drive.google.com/uc?id=1lNabQDK5XtQ4b09REEZNT2rNO3yZiE6z",
      picture: [
        "https://drive.google.com/uc?id=1geYI0_2QUdIfD4DQybRjYU7qVDdO0I4a",
        "https://drive.google.com/uc?id=1gMDNCjGQxS6td3adEd4vfWDBJmLr8UDd",
        "https://drive.google.com/uc?id=140l40hgGZK6ONIfe0rPTyOs8OwPQ_EBk",
        "https://drive.google.com/uc?id=1r-wtAARVXLRkFct9keLTHLFF8tovgjoJ",
        "https://drive.google.com/uc?id=1ktSSlhQbwyKVtaQ-ocoj-3oPtQQX0fMm",
      ],
      description:
        "Consequatur dicta eos. Sed vel consequuntur. Ad rerum earum dolor.",

      price: 450,
      rating: 5,

      id: "6601bad7c6b2856572788659",
    },
    {
      _id: "6601b2b9c6b2856572788650",
      name: "Phu Tub Berk",
      address: "Wang Ban",
      district: "Lom Kao",
      province: "Phetchabun",
      region: "Thailand",
      postalcode: "42120",
      tel: "0626612310",
      url: "https://thai.tourismthailand.org/Attraction/%E0%B8%A0%E0%B8%B9%E0%B8%97%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%81",
      maxReservations: 5,
      coverpicture:
        "https://drive.google.com/uc?id=1-gzAg92KYkStG5TeWDg__jM1MBmlOoXr",
      picture: [
        "https://drive.google.com/uc?id=1FUUWMKNOEVDRoQGwow3U_E5-C8x9v9xc",
        "https://drive.google.com/uc?id=1IWG2HpMQkQJeR6hSeXwjmG4qWp-pNwfA",
        "https://drive.google.com/uc?id=1rblz2HrkFnn6bLz4lLvezWHw0IaNC6Lo",
        "https://drive.google.com/uc?id=1x1cUWEg_sll5xAo3nc-eaSjP-v1ui7wW",
        "https://drive.google.com/uc?id=1HchxtXzYoRFnnJ3S-6-NRTsnjhrwvshv",
      ],
      description:
        "Labore beatae sed nisi eaque. Beatae eum dolorem quasi a. Ad ad doloribus. Eveniet delectus aut cum sequi atque est architecto. Ut voluptatem aut. Omnis saepe totam inventore.",

      price: 2500,
      rating: 4,

      id: "6601b2b9c6b2856572788650",
    },
    {
      _id: "6601b518c6b2856572788653",
      name: "Sai Ngam Hot Spring",
      address: "Ban Kang",
      district: "Pai",
      province: "Mae Hong Son",
      region: "Thailand",
      postalcode: "58130",
      tel: "0628712330",
      url: "https://www.facebook.com/AmazingThailand/photos/a.171767535698/10158906998520699/?type=3",
      maxReservations: 5,
      coverpicture:
        "https://drive.google.com/uc?id=1YfJDcnfAUX7G5iYE2ORFJOQ3GUbuQnzG",
      picture: [
        "https://drive.google.com/uc?id=1bZ7nerbfTR2-_Y1KZJ_whtwU5tKLux9g",
        "https://drive.google.com/uc?id=1dJrtxyErYZOsWMKT2LklDeDxNpunWy2T",
        "https://drive.google.com/uc?id=17lRIuWXV4VkN4uBXsLHCnRLlVElMSHxg",
        "https://drive.google.com/uc?id=1_majrxksZ5GWxTgs9OOKeXrfSrbG1AnE",
        "https://drive.google.com/uc?id=10YtnQz5OnzUUYuxnqbcyhDWF58HiHB8j",
      ],
      description:
        "Et voluptatem minima. Atque aspernatur nisi ratione ad natus necessitatibus cum in sed. Eaque consequatur dolor vitae optio autem pariatur voluptatem eum accusamus. Repellendus et qui eum recusandae qui sint. Alias iusto officia et occaecati et reiciendis aut. Aut quos saepe vitae praesentium.",

      price: 10000,
      rating: 4,

      id: "6601b518c6b2856572788653",
    },
  ],
};

// Jest mock for fetch
jest.mock("node-fetch", () =>
  jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockCampgroundData),
  })
);

describe("getCampgrounds", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Use jest.restoreAllMocks() to restore mocks
  });

  test("should return mock campground data", async () => {
    const campgroundData = await getCampgrounds();
    expect(campgroundData).toEqual(mockCampgroundData);
  });
});
