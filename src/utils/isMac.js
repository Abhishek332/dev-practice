module.exports = ()=>{
    //checks operating system is Mac or not, for window value is win64/win32, for MAC it is darwin
    const isMac = process.platform === "darwin";
    return isMac;
}