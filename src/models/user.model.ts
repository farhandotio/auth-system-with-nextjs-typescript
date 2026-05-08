import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  phone?: string;
  role: 'user' | 'seller' | 'admin';

  // Seller-specific fields
  shopName?: string;
  shopAddress?: string;
  shopPhone?: string;
  shopType?: string;
  isApproved?: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
  requestedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;

  sellerProducts?: mongoose.Types.ObjectId[];
  orders?: mongoose.Types.ObjectId[];

  cart?: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'seller', 'admin'],
      default: 'user',
    },

    // Seller-specific fields
    shopName: {
      type: String,
    },
    shopAddress: {
      type: String,
    },
    shopPhone: {
      type: String,
    },
    shopType: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    requestedAt: {
      type: Date,
    },
    rejectedAt: {
      type: Date,
    },
    rejectedReason: {
      type: String,
    },

    sellerProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);

export default User;
