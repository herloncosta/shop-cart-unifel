import { Github, Linkedin, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='mt-20 bg-slate-200 border-t-2 border-slate-500'>
			<div className='container mx-auto px-4 py-12'>
				<div className='max-w-6xl mx-auto'>
					<div className='grid md:grid-cols-3 gap-8 mb-8'>
						<div>
							<div className='font-bold text-2xl text-primary mb-4'>
								{"ShopCart Unifel"}
							</div>
							<p className='text-muted-foreground leading-relaxed'>
								Trabalho de conclusão de curso desenvolvido por Herlon Costa,
								aluno do curso de Desenvolvimento Front-end com IA da Unifel.
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-4'>Links Rápidos</h3>
							<ul className='space-y-2'>
								<li>
									<Link to='/' className='hover:underline'>
										Produtos
									</Link>
								</li>
								<li>
									<Link to='/favorites' className='hover:underline'>
										Favoritos
									</Link>
								</li>
								<li>
									<Link to='/cart' className='hover:underline'>
										Carrinho
									</Link>
								</li>
								<li>
									<Link to='/checkout' className='hover:underline'>
										Checkout
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-semibold mb-4'>Conecte-se</h3>
							<div className='flex space-x-4'>
								<a
									href='https://github.com/herloncosta'
									className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-300 hover:text-slate-900 transition-colors'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Github className='w-5 h-5' />
								</a>

								<a
									href='https://www.linkedin.com/in/herloncosta/'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-300 hover:text-slate-900 transition-colors'
								>
									<Linkedin className='w-5 h-5' />
								</a>
							</div>

							<p className='text-sm text-muted-foreground mt-4'>
								Disponível para freelances e oportunidades de trabalho.
							</p>
						</div>
					</div>

					<div className='border-t-2 border-slate-500 pt-8'>
						<div className='flex flex-col md:flex-row justify-between items-center'>
							<p className='text-sm text-muted-foreground'>
								© {currentYear} Herlon Costa. Todos os direitos reservados.
							</p>

							<p className='text-sm text-muted-foreground flex items-center mt-4 md:mt-0'>
								Feito com <Heart className='w-4 h-4 mx-1 text-red-500' /> usando
								React.js e Tailwind CSS
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
