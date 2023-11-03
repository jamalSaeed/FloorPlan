const FloorPlan = require('../model/FloorModel');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/image/users');
    },
    filename: (req, file, callBack) => {
        const ext = file.mimetype.split('/')[1];
        callBack(null, `user-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, callBack) => {
    if (file.mimetype.startsWith('image')) {
        callBack(null, true);
    } else {
        callBack("Not an image file!!", false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadFloorImages = upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'img' }]);


exports.checkBody = (req, res, next) => {
    console.log(JSON.stringify(req.body));
    if (!req.body || !req.body.name) {
        return res.status(400).json({
            status: "failed",
            message: "Missing or invalid 'name' in the request body"
        });
    }

    next();
};

exports.getAllFloorPlan = async (req, res) => {

    try {
        const floorPlan = await FloorPlan.find();

        res.status(200).json({
            status: "Successful",
            data: {
                floorPlan: floorPlan
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "Failed",
            message: err
        });
    }
}

exports.createNewFloorPlan = async (req, res) => {
    try {
        const { name, address, remarks, location, description, date } = req.body;
        const mainImageFile = req.files['mainImage'][0]; // Access the mainImage file
        const floorDetailImages = req.files['img']; // Access the img field files

        console.log("images are ", req.files)
        
        // Parse the JSON string to get the imgCount array
        const imgCount = JSON.parse(req.body.imgCount);
        console.log('imgCount from frontend:', imgCount);

        // Create a new FloorPlan instance
        const newFloorPlan = new FloorPlan({
            name,
            address,
            remarks,
            date,
            floorDetails: [],
        });

        // Add mainImage if it exists
        if (mainImageFile) {
            newFloorPlan.mainImage = mainImageFile.filename;
        }

        // Generate floorDetails based on imgCount
        imgCount.forEach((count, index) => {
            const floorDetail = {
                img: [],
                location: typeof(location) === 'string' ? location : location[index] , // Adjust the key to match the new form data structure
                description: typeof(location) === 'string' ? description : description[index] // Similarly, adjust the description key
            };

            if (floorDetailImages) {
                for (let i = 0; i < count; i++) {
                    const image = floorDetailImages.shift(); // Shift and remove the first image from the array
                    if (image) {
                        const ext = image.originalname.split('.').pop();
                        floorDetail.img.push(image.filename);
                    }
                }
            }

            newFloorPlan.floorDetails.push(floorDetail);
        });



        await newFloorPlan.save();

        res.status(201).json({
            status: "Successful",
            data: {
                floorPlan: newFloorPlan,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message,
        });
    }
};



