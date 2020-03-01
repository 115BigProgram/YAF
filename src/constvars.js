let totCol=12;
let singleColWidth = 100/totCol;
let cols=[];
for(let i=0;i<totCol;i++) {
    cols.push((i*singleColWidth).toString()+"%")
}


export {cols as Cols}
export const ContentHorizontalPadding = "20%"
export const ContentLength = "60%"
export const TopNavBarHeight = 120

export const DesktopMiniWidth = 1100
export const TabletMiniWidth  = 600
