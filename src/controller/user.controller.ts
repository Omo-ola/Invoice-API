import { Response, Request } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "User with email already exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin: false,
    };

    User.create(userData)
      .then((user) => {
        res.status(200).json({ message: "Successful", userId: user._id });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error try again", error });
      });
  });
};

export const getAllUser = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ message: "User retrieved successfully", users });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving,try again", error });
    });
};

export const getOneUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      res.status(200).json({ message: "User retrieved", user });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error, Try again", error });
    });
};



//  To get this route , provide Authorization token in the header
export const getAuthUser = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(403).send({ message: "Authentication needed" });
  }
};

export const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userData = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    isAdmin: false,
  };

  User.findByIdAndUpdate(userId, userData)
    .then(() => {
      res.status(200).json({ message: "Successfully updated", userId });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error, Try again", error });
    });
};

export const deleteUser = (req: Request, res: Response) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error,Try again", error });
    });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User with email not found" });
      } else if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        `${process.env.JWT_SECRET}`
      );
      return res.status(200).json({ message: "User found", token });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Error login in,Try again", error });
    });
};
