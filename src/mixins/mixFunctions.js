const mixinFunctions = {
  methods: {
    capitalizeFirstLetter(val) {
      return val.charAt(0).toUpperCase() + val.substr(1);
    }
  }
};

export { mixinFunctions };
