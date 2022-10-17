exports.success = async (req, res, result,code) => {
    try {
        console.log(result)
      const response = {
        success: true,
        status_code: code,
        //message: (lngMsg[lng] ? lngMsg[lng][result.msgCode] : lngMsg.en[result.msgCode]) || httpStatus[code],
        message:result.message?result.message:"Success",
        stage:result.stage??null,
        result: result.data??null,
        //time: Date.now()
      };
      return res.status(code).json(response);
    } catch (error) {
      return res.json(
        {
          success: true,
          status_code: 500,
          message:result.message?result.message:'INTERNAL_SERVER_ERROR',
         // message: lngMsg[lng] ? lngMsg[lng].INTERNAL_SERVER_ERROR : lngMsg.en.INTERNAL_SERVER_ERROR,
          result: '',
          //time: Date.now()
        });
    }
  };

  exports.error = async (req, res, error, code) => {
    
    try {
      const response = {
        success: false,
        status_code: code,
        message:error.message?error.message:'error',
        //message: (lngMsg[lng] ? lngMsg[lng][error.msgCode] : lngMsg.en[error.msgCode]) || error.msgCode || httpStatus[code],
        // result: {
        //   error: error.data ? error.data : 'error'
        // },
       // time: Date.now()
      };
      return res.status(code).json(response);
    } catch (err) {
      return res.status(500).json({
        success: false,
        status_code: 500,
        message:error.message?error.message:'INTERNAL_SERVER_ERROR',
       // message: lngMsg[lng] ? lngMsg[lng].INTERNAL_SERVER_ERROR : lngMsg.en.INTERNAL_SERVER_ERROR,
        //result: "",
        //time: Date.now()
      });
    }
  };