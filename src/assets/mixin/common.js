export const common = {
  data() {
    return {};
  },
  methods: {
    /**
     * el 弹窗
     * @param {String} msg 弹窗信息
     * @param {Number} type 弹窗类别
     */
    messageLayer(msg, type) {
      let config = {
        message: msg
      };
      switch (type) {
        case 0:
          config.type = "error";
          break;
        case 1:
          config.type = "success";
          break;
        case 2:
          config.type = "warning";
          break;
        default:
          break;
      }
      this.$message(config);
    }
  }
};
