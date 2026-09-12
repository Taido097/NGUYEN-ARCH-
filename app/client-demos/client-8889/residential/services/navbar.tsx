const HOME_HREF = '/client-demos/client-8889/arcsphere-socal';
const SERVICES_HREF = '/client-demos/client-8889/arcsphere-socal#services';
const CONTACT_HREF = '/client-demos/client-8889/residential/contact';

const NAV_CSS = `
.rnav-bar{position:sticky;top:0;z-index:20;background:rgba(240,235,230,.96);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
.rnav-inner{width:min(1760px,100%);margin:0 auto;padding:0 clamp(24px,3vw,64px)}
.rnav{height:86px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;font-family:"Inter Display","Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;color:#4f4742}
.rnav-left{display:flex;align-items:center;justify-content:flex-start;gap:38px;min-width:0}
.rnav-link,.rnav-brand,.rnav-contact{color:inherit;text-decoration:none}
.rnav-link{font-size:14px;font-weight:500;letter-spacing:-.4px;line-height:110%;text-transform:uppercase;white-space:nowrap;transition:opacity .2s;color:#4f4742}
.rnav-link:hover,.rnav-brand:hover{opacity:.6}
.rnav-brand{font-size:24px;font-weight:400;letter-spacing:-.4px;line-height:110%;text-transform:uppercase;white-space:nowrap;text-align:center;transition:opacity .2s;color:#4f4742}
.rnav-right{display:flex;justify-content:flex-end;align-items:center;min-width:max-content}
.rnav-contact{display:inline-flex!important;align-items:center;justify-content:center;background:#4f4742;color:#f0ebe6!important;border-radius:999px;padding:11px 22px;font-size:14px;font-weight:500;letter-spacing:-.2px;line-height:120%;text-transform:uppercase;white-space:nowrap;transition:opacity .2s;visibility:visible!important;opacity:1;flex:none}
.rnav-contact:hover{opacity:.8}
@media(max-width:900px){.rnav{grid-template-columns:minmax(0,1fr) auto;height:72px;gap:16px}.rnav-brand{display:none}.rnav-left{gap:24px}}
@media(max-width:560px){.rnav{height:66px;gap:10px}.rnav-inner{padding:0 18px}.rnav-left{gap:14px}.rnav-link{font-size:12px}.rnav-contact{font-size:11px;padding:9px 13px}}
`;

export default function Navbar() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NAV_CSS }} />
      <div className="rnav-bar">
        <div className="rnav-inner">
          <nav className="rnav" aria-label="Primary navigation">
            <div className="rnav-left">
              <a className="rnav-link" href={HOME_HREF}>Home</a>
              <a className="rnav-link" href={SERVICES_HREF}>Services</a>
            </div>
            <a className="rnav-brand" href={HOME_HREF}>NGUYEN Architecture</a>
            <div className="rnav-right">
              <a className="rnav-contact" href={CONTACT_HREF}>Contact Us</a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
