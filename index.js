
class kenzap{

    // init class
    constructor(data){
        
        // cache data
        this.data = data;
    
        // call render
        this.render();

        // listeners
        this.listeners();
    }

    // renders class html
    render = () => {

    let count = 0

    document.querySelector('#content').insertAdjacentHTML('beforeend',
        `
        <section id='accordion' class="kenzap">
                <div class="kenzap-acc-2">
                    <div class="kenzap-container" style="max-width:1170px">
                        <div class=${this.data.col > 1 ? `kenzap-row` : ""}>
                            <div class=${this.data.col > 1 ? `kenzap-col-${Math.floor(12/this.data.col)}` : ""}>
                                <ul class="accordion">
                                    ${
                                        this.data.items.map(item => {
                                            return `
                                            <li>
                                                    <a class="toggle" href="#"><span class="plus"></span> ${item.header} </a>
                                                    <div class="inner">
                                                        <p>${item.text}</p>
                                                    </div>
                                            </li>
                                            `
                                        }).join('')
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        `
    );
    }

    listeners = () => {
        let items = [...document.querySelectorAll('.kenzap .kenzap-acc-2 .toggle')]

        items.forEach(item => {
            item.addEventListener('click', toggleClick);
        })

        function toggleClick(e){        
            e.preventDefault();
            console.log('click')

            let element = e.currentTarget;
            
            // if active then toggled, remove active class, show, and display property
            if(element.classList.contains('active')){
                element.classList.remove('active')
                element.nextElementSibling.classList.remove('show')
                element.nextElementSibling.style.removeProperty('display')
            } else {
                let parent = element.parentElement.parentElement
                let inner = parent.querySelectorAll('li .inner');

                inner.forEach(innerElement => {
                    innerElement.classList.remove('show')
                    innerElement.style.removeProperty('display')
                })

                element.nextElementSibling.classList.toggle('show')
                element.nextElementSibling.style.display = 'block'

                let tog = parent.querySelectorAll('li .toggle');

                tog.forEach(innerElement => {
                    innerElement.classList.remove('active')
                })
                element.classList.add('active')
            }
        }
    }
}

window.kenzap = kenzap;