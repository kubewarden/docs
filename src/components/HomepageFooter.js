import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function HomepageFooter() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <footer id="lc-footer">
            <div className="text-light bg-dark">
                <footer>
                    <div className="container pt-4 pb-4">
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-center">
                                <div>© {new Date().getFullYear()} <a href={siteConfig.url}>harvesterhci.io</a></div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center justify-content-end">
                                <div className="project-icons text-right">
                                    <a href="https://k3s.io" target="blank" rel="noopener">
                                        <svg height="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"
                                            viewBox="0 0 194.256 159.089">
                                            <style>
                                                {
                                                    `svg {
                                                        fill: currentColor
                                                    }

                                                    svg:hover .k3s {
                                                        fill: #ffc61c
                                                    }`
                                                }
                                            </style>
                                            <path className="k3s" fill="currentColor"
                                                d="M173.695 0H20.561A20.621 20.621 0 000 20.56v117.968a20.621 20.621 0 0020.56 20.561h153.135a20.621 20.621 0 0020.561-20.56V20.56A20.621 20.621 0 00173.696 0zM82.083 115.687L44.71 137.405a10 10 0 11-10.049-17.292l37.372-21.718a10 10 0 1110.049 17.292zm14.702-33.09h-.045a10 10 0 01-9.956-10.043l.188-43.053a10 10 0 019.999-9.956h.045a10 10 0 019.956 10.043l-.188 43.053a10 10 0 01-9.999 9.957zm66.125 51.158a9.996 9.996 0 01-13.66 3.66l-37.427-21.608a10 10 0 0110-17.32l37.427 21.608a10 10 0 013.66 13.66z">
                                            </path>
                                        </svg>
                                    </a>
                                    <a href="https://k3os.io" target="blank" rel="noopener">
                                        <svg height="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"
                                            viewBox="0 0 194.256 159.089">
                                            <style>
                                                {
                                                    `svg {
                                                        fill: currentColor
                                                    }

                                                    svg:hover .k3os {
                                                        fill: #FD824E
                                                    }`
                                                }
                                            </style>
                                            <path className="k3os" fill="currentColor"
                                                d="M173.696 0H20.56A20.621 20.621 0 000 20.56v117.968a20.621 20.621 0 0020.56 20.561h153.136a20.621 20.621 0 0020.56-20.56V20.56A20.621 20.621 0 00173.696 0zM50.138 138.898a18.85 18.85 0 110-37.7 18.666 18.666 0 018.98 2.322l-13.891 8.072a9.78 9.78 0 00-3.543 13.369 9.778 9.778 0 0013.369 3.543l13.917-8.089a18.863 18.863 0 01-18.832 18.483zm37.44-35.156l-35.072 20.38a4.713 4.713 0 11-4.735-8.149l35.07-20.38a4.713 4.713 0 014.737 8.149zm-.226-65.119l-.061 16.06a18.846 18.846 0 1119.558.079l.06-16.066a9.78 9.78 0 10-19.557-.073zm14.338 40.614a4.713 4.713 0 01-4.712 4.695h-.019a4.713 4.713 0 01-4.694-4.73l.153-40.56a4.713 4.713 0 014.712-4.695h.019a4.713 4.713 0 014.695 4.73zm2.992 18.039a4.711 4.711 0 016.438-1.725l35.355 20.412a4.713 4.713 0 11-4.713 8.163l-35.355-20.413a4.712 4.712 0 01-1.725-6.437zm39.437 41.62a18.862 18.862 0 01-18.83-18.43l13.939 8.047a9.78 9.78 0 009.78-16.938l-13.913-8.033a18.663 18.663 0 019.024-2.348 18.85 18.85 0 110 37.701z">
                                            </path>
                                        </svg>
                                    </a>
                                    <a href="https://rio.io" target="blank" rel="noopener">
                                        <svg height="20" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                            viewBox="0 0 194.256 159.089">
                                            <style>
                                                {
                                                    `svg {
                                                        fill: currentColor
                                                    }

                                                    svg:hover .rio {
                                                        fill: #72c2cf
                                                    }`
                                                }
                                            </style>
                                            <path className="rio" fill="currentColor"
                                                d="M161.878 89.217c-7.182 3.51-19.465 8.373-32.375 8.373s-25.193-4.863-32.376-8.373c-7.182 3.51-19.465 8.373-32.374 8.373-12.911 0-25.195-4.864-32.379-8.373C25.193 92.727 12.91 97.59 0 97.59v40.938a20.621 20.621 0 0020.56 20.561h153.136a20.621 20.621 0 0020.56-20.56V97.59c-12.91 0-25.195-4.864-32.378-8.373zM26.099 65.376l6.285-3.835 6.293 3.851c3.724 2.272 15.727 8.21 26.076 8.21 12.434 0 25.938-8.127 26.07-8.209l6.304-3.894 6.303 3.893c3.724 2.272 15.725 8.21 26.073 8.21s22.349-5.938 26.1-8.226l6.285-3.835 6.293 3.851c3.723 2.272 15.726 8.21 26.075 8.21V20.561A20.621 20.621 0 00173.696 0H20.56A20.621 20.621 0 000 20.56v53.042c10.347 0 22.348-5.938 26.099-8.226z">
                                            </path>
                                        </svg>
                                    </a>
                                    <a href="https://submariner.io/" target="blank" rel="noopener">
                                        <svg height="20" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                            viewBox="0 0 194.256 159.089">
                                            <style>
                                                {
                                                    `svg {
                                                        fill: currentColor
                                                    }

                                                    svg:hover .submariner {
                                                        fill: #2adfc3
                                                    }`
                                                }
                                            </style>
                                            <path className="submariner"
                                                d="M48.552 48.551v20.994h99.442a17.73 17.73 0 0117.71 17.71v25.573a17.73 17.73 0 01-17.71 17.71H0v7.99a20.621 20.621 0 0020.56 20.561h153.136a20.621 20.621 0 0020.56-20.56V48.55z">
                                            </path>
                                            <path className="submariner"
                                                d="M145.704 110.538V89.545H46.262a17.73 17.73 0 01-17.71-17.71V46.26a17.73 17.73 0 0117.71-17.71h147.994v-7.99A20.621 20.621 0 00173.696 0H20.56A20.621 20.621 0 000 20.56v89.978z">
                                            </path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </footer>
    )
}