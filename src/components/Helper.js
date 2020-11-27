export default class Helper {
    static addCSS = s =>(d=>{d.head.appendChild(d.createElement("style")).innerHTML=s})(document);
};