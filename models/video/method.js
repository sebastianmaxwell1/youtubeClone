const mongoose = require("mongoose");
const moment = require("moment");

const { extractVideoInfo } = require("../../utils");

const ObjectId = mongoose.Types.ObjectId;

const methods = (videoSchema) => {
  videoSchema.statics.findByName = async function (filename) {
    const Video = this;
    let video;
    try {
      video = await Video.findOne({ filename });
      if (!video)
        throw {
          name: "InvalidResourceError",
          message: "Video not found",
        };
      return video;
    } catch (err) {
      throw err;
    }
  };

  
  videoSchema.statics.findByTitle = async function (title) {
    const Video = this;
    let videoResults = [];
    try {
      const videos = await Video.find({
        title: {
          $regex: title,
          $options: "i",
        },
      }).populate("uploader");
      videos.forEach((video) => {
        video.authorize(
          (isAuth) => {
            if (isAuth) {
              const videoInfo = extractVideoInfo(video);
              videoResults.push(videoInfo);
            } else {
            }
          },
          { onlyPublic: true }
        );
      });
      return videoResults;
    } catch (err) {
      throw err;
    }
  };
  videoSchema.statics.findByThumbnail = async function (thumbnailFilename) {
    const Video = this;
    let video;
    try {
      video = await Video.findOne({ thumbnailFilename });
      if (!video)
        throw {
          name: "InvalidResourceError",
          message: "Video not found",
        };
      return video;
    } catch (err) {
      throw err;
    }
  };

  videoSchema.statics.getRecommended = async function ({ userId, count = 8 }) {
    const Video = this;
    let videos;

    try {
      
      const filter = {
        uploader: { $ne: ObjectId(userId) },
        visibility: 0,
      };
      videos = await Video.aggregate([
        { $match: filter },
        { $sample: { size: count } }, 
        {
          $lookup: {
            from: "channels",
            localField: "uploader",
            foreignField: "_id",
            as: "uploader",
          },
        },
      ]);
      const recommended = [];
      videos.forEach((video) => {
        authorize(
          (isAuth) => {
            if (isAuth) {
              const recommendVideo = { ...extractVideoInfo(video) };
              recommended.push(recommendVideo);
            } else {
            }
          },
          {
            onlyPublic: true,
            video: { ...video, uploader: video.uploader._id },
            userId,
          }
        );
      });
      return recommended;
    } catch (err) {
      throw err;
    }
  };
}

  module.exports = methods;