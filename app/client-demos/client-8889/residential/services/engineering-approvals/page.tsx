import ServiceDetailPage from '../[slug]/page';

export const metadata = {
  title: 'Engineering & Approvals — NGUYEN Architecture',
  robots: { index: false, follow: false },
};

export default async function EngineeringApprovalsPage() {
  const page = await ServiceDetailPage({ params: Promise.resolve({ slug: 'engineering-approvals' }) });

  return (
    <>
      {page}
      <style>{`
        .nrd .svc-os{
          width:calc(100vw - 48px)!important;
          max-width:none!important;
          margin-left:calc(50% - 50vw + 24px)!important;
          transform:none!important;
        }
      `}</style>
    </>
  );
}
