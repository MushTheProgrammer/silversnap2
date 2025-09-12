"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export const teamMembers = [
	{
		name: "Dinal De Silva",
		role: "Photographer/ Videographer/ Editor",
		bio: "A dedicated photographer transforming moments into timeless imagery. I specialize in crafting compelling visual stories that resonate with authenticity and emotion for every client.",
		avatar: "/img/team/Dinal.jpg",
		cardImage: "/img/team/Dinal.jpg",
		initials: "DS",
		aiHint: "professional portrait",
		socials: {
			linkedin: "#",
			facebook: "#",
			instagram: "#",
		}
	},
	{
		name: "Sachitha Athukorala",
		role: "Editor/ Photographer ",
		bio: "A dual-threat visual professional mastering both the camera and the digital darkroom. I capture the moment and meticulously polish it to perfection for a flawless final product.",
		avatar: "/img/team/Sachitha.jpg",
		cardImage: "/img/team/Sachitha.jpg",
		initials: "SA",
		aiHint: "woman smiling",
		socials: {
			linkedin: "#",
			facebook: "#",
			instagram: "#",
		}
	},
	{
		name: "Musharaf Mohamad",
		role: "Digital Asset Manager & Technical Lead",
		bio: "A technical lead architecting our online presence, building the robust systems that power our digital identity and ensure a seamless, impactful experience for our clients.",
		avatar: "/img/team/Musharaf.jpg",
		cardImage: "/img/team/Musharaf.jpg",
		initials: "MM",
		aiHint: "man glasses",
		socials: {
			linkedin: "#",
			facebook: "#",
			instagram: "#",
		}
	},
];

type TeamMember = (typeof teamMembers)[0];

export default function Team() {
	const [selectedMember, setSelectedMember] = useState<TeamMember | null>(teamMembers[0]);

	return (
		<section id="team" className="py-20 md:py-32 relative bg-transparent">
			<div className="absolute inset-0 z-0 background-bleed">
				{selectedMember && (
					<Image
						key={selectedMember.name}
						src={selectedMember.cardImage}
						alt={`${selectedMember.name}'s work`}
						data-ai-hint="photography portfolio"
						fill
						className="object-cover"
					/>
				)}
				<div className="absolute inset-0 bg-background/60 backdrop-blur-2xl" />
			</div>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="text-center space-y-4 mb-12">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-headline text-foreground">Meet Our Team</h2>
					<p className="max-w-2xl mx-auto text-muted-foreground text-lg">
						The creative minds behind SilverSnaps.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="flex flex-col items-center md:items-start gap-8 text-center md:text-left">
						{teamMembers.map((member) => (
							<h3
								key={member.name}
								className={cn(
									"text-3xl sm:text-4xl md:text-5xl md:text-7xl font-bold font-headline cursor-pointer transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90vw] md:max-w-none",
									selectedMember?.name === member.name ? 'bg-gradient-to-r from-[#211a1dff] via-[#6320eeff] to-[#f8f0fbff] bg-clip-text text-transparent' : 'text-foreground/50 hover:text-foreground/80'
								)}
								onClick={() => setSelectedMember(member)}
								onMouseEnter={(e) => {
									if (window.innerWidth >= 768) {
										setSelectedMember(member);
									}
								}}
							>
								{member.name}
							</h3>
						))}
					</div>

					  <div className="relative w-full max-w-[380px] h-[590px] mx-auto flex justify-center items-center">
						{teamMembers.map((member) => (
							<div
								key={member.name}
								className={cn(
									'absolute inset-0 transition-opacity duration-500 flex flex-col justify-end',
									selectedMember?.name === member.name ? 'opacity-100' : 'opacity-0 pointer-events-none'
								)}
							>
								<div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden">
									<Image
										src={member.cardImage}
										alt={member.name}
										data-ai-hint={member.aiHint}
										fill
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 flex flex-col justify-end">
										<p className="text-white/80 font-semibold mb-2">{member.role}</p>
										<p className="text-white/90 mb-4">{member.bio}</p>
										<div className="flex gap-4">
											<Link href={member.socials.linkedin} className="text-white/70 hover:text-white transition-colors"><Linkedin size={20} /></Link>
											<Link href={member.socials.facebook} className="text-white/70 hover:text-white transition-colors"><Facebook size={20} /></Link>
											<Link href={member.socials.instagram} className="text-white/70 hover:text-white transition-colors"><Instagram size={20} /></Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
