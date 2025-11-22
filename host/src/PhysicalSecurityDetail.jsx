
import Layout from "./Layout";
import BackButton from "./BackButton";
import Service1 from "./assets/Security2.jpg";

export default function PhysicalSecurityDetail() {
    return (
        <Layout>
            <section className="w-full min-h-screen bg-black/90 backdrop-blur-sm py-16 px-4 md:px-12 lg:px-24 text-white">

                {/* Back Button */}
                <BackButton />

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400">
                        Physical Security
                    </h1>
                    <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
                        Oscardyne Security — Protecting people, property, and assets with unmatched expertise and professionalism.
                    </p>
                </div>

                {/* Hero Image */}
                <div className="w-full h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,120,255,0.3)] mb-12 relative">
                    <img
                        src={Service1}
                        alt="Physical Security"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent mix-blend-overlay"></div>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto flex flex-col gap-10">
                    
                    {/* Overview */}
                    <article className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,120,255,0.2)] border border-white/10 transition-all hover:shadow-[0_15px_50px_rgba(0,120,255,0.35)]">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-400">
                            Overview
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            Physical security is the foundation of protecting individuals, businesses, and critical assets. 
                            Our trained security guards and personnel ensure safety through proactive monitoring, controlled 
                            access, and rapid response to incidents. From corporate facilities to residential properties, our 
                            team tailors solutions to the unique needs of each client.
                        </p>
                    </article>

                    {/* Services Offered */}
                    <article className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,120,255,0.2)] border border-white/10 transition-all hover:shadow-[0_15px_50px_rgba(0,120,255,0.35)]">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-400">
                            Services Offered
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 text-base md:text-lg">
                            <li>Uniformed and plain-clothes security personnel for corporate, industrial, and residential sites.</li>
                            <li>Access control management to regulate entry and exit points for employees and visitors.</li>
                            <li>24/7 CCTV monitoring and remote surveillance to prevent theft and intrusion.</li>
                            <li>Emergency response and incident management for immediate action in case of security breaches.</li>
                            <li>VIP protection and personal escort services for executives and high-profile clients.</li>
                        </ul>
                    </article>

                    {/* Why Choose Us */}
                    <article className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,120,255,0.2)] border border-white/10 transition-all hover:shadow-[0_15px_50px_rgba(0,120,255,0.35)]">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-400">
                            Why Choose Oscardyne Security
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                            Our security personnel are rigorously trained, licensed, and equipped with the latest tools to 
                            provide reliable protection. With years of experience across multiple sectors, we anticipate threats 
                            before they arise and offer solutions tailored to your specific environment.
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            By integrating modern technology with professional human resources, we ensure a security approach 
                            that is both proactive and responsive. Your safety is our top priority.
                        </p>
                    </article>
                </div>
            </section>
        </Layout>
    );
}
