import React, {useEffect, useContext} from 'react';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import './Gioconda.css';

import {GlobalContext} from "../context"

export default props => {
	const { go } = useContext(GlobalContext)

	const reload = _ => {
		window.eval(`S=",$#:A7*?0O1#))0--01#52-OK &576-R/7$.<:3? 3&,OV@58665   RJ5((%(#R/ B1*((A@ .,NA4%E<)/G76$5K<&(&#R#E&#-,%C=/(?+(%46,(:E7 14K-&-* RL:%(ujH&A9-1/.9% $10011R JB(+*-09N0#0+#>-70/YH./  *8>@6R3J7(0+)+-+#$xrc+015+,))5F (;+((DIE%%%$#AM $3.-)=GK(&&$1*HF&$##$;H.)#65/R2O1#<5*GL0%=$%#R6<#+F:+7M $<41+R C(.?=/,9O&# !(<6L*%..(; $.%NB)3C#)(<9-R-8.,XVL,H?&%/3(*67%(*18<3D$-3.(K-<%(@/ ;8M*$-( <6 )>$  :  55/*$R0P8!-*&RLC%)54&E  82*,#:* =(XUF%1)(&@:/R0D%#WH-R2L1%-) 9/),(50&R +>>,))9E$,)?@:O1)&)2;C8.0033.!4N0#6!#%RK)&>371+  J#970QJ+(:-.(G *?22.%R5M,!=7.4O #1974<>0#<)&#R @&//3+L,*06,)$Q-2113-$R; 6#:8/PMF$&243:H$#.:<1R* B$;=4Q4J-(2-$RI+#0@=1@ I(%64,QO1#@14-E";f="fillRect";V=document.body.querySelector("#c");R=Math.random;W=V.width=H=V.height=100;c=V.getContext("2d");c[f](0,0,W,H);c.globalCompositeOperation="lighter";z=[];for (i=0;i<640;i++)z[i]=(S.charCodeAt(i)-32)*2,i&&(i%8==0)&&(c.fillStyle="rgba("+z[i-4]+","+z[i-3]+","+z[i-2]+","+(z[i-1]/100)+")",c[f](0|(2*R()+z[i-8]),0|(2*R()+z[i-7]),z[i-6],z[i-5]))`)
	}
	useEffect(reload)

	return <Panel id={props.id}>
		<PanelHeader
			before={<PanelHeaderBack onClick={()=>go("home")} />}
		>
			Мона Лиза
		</PanelHeader>
		<canvas className="Gioconda" id="c" height={100} width={100} onClick={reload}/>
	</Panel>
}