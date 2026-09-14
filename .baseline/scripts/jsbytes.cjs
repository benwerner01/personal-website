/*
 * gzip-equivalent JS bytes a route loads (before `load`, and after 3 s of idle)
 * from a local `next start`. Next 16 no longer prints First Load JS in the build
 * output, so this is the size baseline.
 *
 * Usage: NODE_PATH=<tools>/node_modules node .baseline/scripts/jsbytes.cjs http://localhost:3000 /route
 */
const {chromium}=require("playwright"); const zlib=require("zlib");
(async()=>{const b=await chromium.launch(); const [base,route]=[process.argv[2],process.argv[3]];
const p=await b.newPage({viewport:{width:1440,height:900}}); let load=0,total=0,loaded=false; const seen=new Set();
p.on("response",async r=>{const u=r.url(); if(!u.endsWith(".js")||seen.has(u)) return; seen.add(u); try{const body=await r.body(); const g=zlib.gzipSync(body).length; total+=g; if(!loaded) load+=g;}catch(e){}});
await p.goto(base+route,{waitUntil:"load"}); loaded=true; await p.waitForTimeout(3000);
console.log(route.padEnd(12), "before load", (load/1024).toFixed(1)+" kB", " after 3s", (total/1024).toFixed(1)+" kB", "("+seen.size+" files)"); await b.close();})();
