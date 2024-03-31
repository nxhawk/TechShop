export const defaultStatus = {
  statusOrder: [
      {
          status: 'PENDING',
          message: 'Chờ đóng gói',
          backgroundColor: 'bg-yellow-400',
          nextStatus: 'PROCESSING CANCELLED',
      },
      {
          status: 'PROCESSING',
          message: 'Chờ giao',
          backgroundColor: 'bg-amber-600 text-white',
          nextStatus: 'DELIVERING',
      },
      {
          status: 'DELIVERING',
          message: 'Đang giao',
          backgroundColor: 'bg-emerald-400',
          nextStatus: 'DELIVERED',
      },
      {
          status: 'DELIVERED',
          message: 'Đã giao',
          backgroundColor: 'bg-green-500 text-white',
          nextStatus: 'RETURNING',
      },
      {
          status: 'CANCELLED',
          message: 'Đã hủy',
          backgroundColor: 'bg-red-500',
          nextStatus: '',
      },
      {
          status: 'RETURNING',
          message: 'Đang hoàn trả',
          backgroundColor: 'bg-blue-400',
          nextStatus: 'RETURNED',
      },
      {
          status: 'RETURNED',
          message: 'Đã hoàn trả',
          backgroundColor: 'bg-gray-500 text-white',
          nextStatus: '',
      },
  ],

  ratingList: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
};

export const defaultValue = {
  image: '/images/Image_not_available.png',
  outOfStock: 'Sản phẩm đã hết hàng',
  setQuantityMoreInStock: 'Số lượng sản phẩm vượt quá số lượng tồn kho',
  avatar: '/images/logo.png',
};

export const SortingOptions = {
  Hot: 'hottest',
  PriceASC: 'price-asc',
  PriceDSC: 'price-dsc',
  Recent: 'recently',
  Create: 'created',
};

export const ratingText = ['Rất tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];

export const provinceData =[
    {
        _id: '0001',
        name: 'Tiền Giang',
        slug: 'tien-giang',
        type: 'tinh',
        name_with_type: 'tinh-tien-giang',
        code: '0001',
        isDeleted: false,
    },
    {
      _id: '0002',
      name: 'An Giang',
      slug: 'an-giang',
      type: 'tinh',
      name_with_type: 'tinh-an-giang',
      code: '0002',
      isDeleted: false,
    },
    {
      _id: '0003',
      name: 'Kiên Giang',
      slug: 'kien-giang',
      type: 'tinh',
      name_with_type: 'tinh-kien-giang',
      code: '0003',
      isDeleted: false,
    },
    {
      _id: '0004',
      name: 'Cao Bằng',
      slug: 'cao-bang',
      type: 'tinh',
      name_with_type: 'tinh-cao-bang',
      code: '0004',
      isDeleted: false,
    }
]

export const districtData =[
  {
      _id: '0001',
      name: 'Gò Công Đông',
      slug: 'go-cong-dong',
      type: 'huyen',
      name_with_type: 'huyen-go-cong-dong',
      code: '0001',
      isDeleted: false,
  },
  {
    _id: '0002',
    name: 'Cái Bè',
    slug: 'cai-be',
    type: 'huyen',
    name_with_type: 'huyen-cai-be',
    code: '0002',
    isDeleted: false,
  },
  {
    _id: '0003',
    name: 'Cai Lậy',
    slug: 'cai-lay',
    type: 'huyen',
    name_with_type: 'huyen-cai-lay',
    code: '0003',
    isDeleted: false,
  },
]

export const villageData =[
  {
      _id: '0001',
      name: 'Kiểng Phước',
      slug: 'kieng-phuoc',
      type: 'xa',
      name_with_type: 'xa-kieng-phuoc',
      code: '0001',
      isDeleted: false,
  },
  {
    _id: '0002',
    name: 'Tân Phước',
    slug: 'tan-phuoc',
    type: 'xa',
    name_with_type: 'xa-tan-phuoc',
    code: '0002',
    isDeleted: false,
  },
  {
    _id: '0003',
    name: 'Tân Đông',
    slug: 'tan-dong',
    type: 'xa',
    name_with_type: 'xa-tan-dong',
    code: '0003',
    isDeleted: false,
  },
  {
    _id: '0004',
    name: 'Tân Tây',
    slug: 'tan-tay',
    type: 'xa',
    name_with_type: 'xa-tan-tay',
    code: '0004',
    isDeleted: false,
  },
]