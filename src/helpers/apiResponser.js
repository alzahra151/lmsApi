class ApiResponser {
  constructor(res, result) {
    const json = {
      success: true,
      status: 200,
      result,
    };
    return res.status(200).json(json);
  }
}

module.exports = ApiResponser;
