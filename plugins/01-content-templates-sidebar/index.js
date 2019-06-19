const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, PanelRow, Button, Modal } = wp.components;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { parse } = wp.blockSerializationDefaultParser;
const { select, dispatch} = wp.data;
const apiRequest = wp.apiRequest;
const ajax= wp.ajax;


const {createBlock, rawHandler} = wp.blocks;



import "./plugin.scss";

/**
 * 
 */

class ContentTemplatesSidebar extends React.Component {

    state = {
        templates : [], // available templates
        selectedTemplate: null, // currently selected template
        isOpen: false // is modal open
    };

    /**
     * Load Available Templates
     */
    componentDidMount(){

        apiRequest( { path: '/wp/v2/content-template' } ).then( posts => {
            this.onNewPosts( posts );
        } );

    }

    /**
     * Receive Templates from REST API
     * 
     * @param {array} posts Content Template Posts (REST)
     */
    onNewPosts( posts ){

        const templates = posts.map( post => {

            return {
                id: post.id,
                title: post.title.rendered,
                content: post.plain_content,
                icon: post.icon
            }

        })

        this.setState( {templates } );

    }

    onReloadEditor(){
    }

    /**
     * Overwrite Blocks on Template Select
     * 
     * @param {*} template Selected Template
     * @param {*} force Skip user consent modal
     */
    onSelectTemplate( template, force = false){
        // const newBlockTemplate = parse(template.content);
        // console.log('newBlockTemplate', newBlockTemplate);

        const isNewPost = select("core/editor").isCleanNewPost();

        // show warning if 
        if (force || isNewPost){

            // get an array of gutenberg blocks from raw HTML (parse blocks)
            var gutblock = wp.blocks.rawHandler({ 
                HTML:  template.content,
            });

            // re-serialize blocks
            // var serelized = wp.blocks.serialize(gutblock);
            // serelized = serelized;

            // delete all Blocks
            dispatch("core/editor").resetBlocks([]);

            // insert new Blocks
            dispatch("core/editor").insertBlocks(gutblock, 0);

            // close Modal and reset selected Template
            this.setState({isOpen:false, selectedTemplate: null})

        }else{
            this.setState({
                isOpen: true,
                selectedTemplate: template
            });
        }
    }

    /**
     * Close the user consent modal
     */
    closeModal(){
        this.setState({isOpen:false, selectedTemplate: null})
    }

    /**
     * Render "No Templates Found" Message
     * 
     * The templatesAdminLink comes from wp_localize_script
     * 
     */
    noTemplatesFound(){
        return (
            <Fragment>
                <h2>{__("No Templates Found", "content-templates")}</h2>
                <p>{__("You don't have any Templates", "content-templates")}</p>
                <a href={templatesAdminLink}>{__("Please create a new Template first.", "content-templates")}</a>
            </Fragment>
        );
    }

    render(){

        const { templates, isOpen } = this.state;

        return (
            <Fragment>
                <PluginSidebarMoreMenuItem target="content-templates-sidebar">
                    {__("Content Templates", "content-templates")}
                </PluginSidebarMoreMenuItem>
                <PluginSidebar
                    name="content-templates-sidebar"
                    title={__("Content Templates", "content-templates")}
                >
                    <PanelBody title={__("Select a Template", "content-templates")} opened>
                        <PanelRow>
                            <ul className="content-template-button-list">
                                {
                                    templates.length > 0 ?
                                        templates.map(template => {
                                            return (
                                                <li key={template.id}>
                                                    <Button isDefault onClick={ () => { this.onSelectTemplate(template) } } className="template-button">
                                                        <img src={template.icon}  width="40"/>
                                                        {template.title}
                                                    </Button>
                                                </li>           
                                            );
                                        }) : this.noTemplatesFound()
                                    
                                }
                            </ul>
                        </PanelRow>
                        </PanelBody>
                </PluginSidebar>
                {
                    isOpen && (
                        <Modal
                            title="Overwrite Content"
                            onRequestClose={ () => this.closeModal() }>
                            <p>
                                Do you want to overwrite all Existing Content?
                            </p>
                            <Button isPrimary onClick={ () => { this.onSelectTemplate( this.state.selectedTemplate, true ) } } >
                                Overwrite Content
                            </Button>
                        </Modal>
                    )
                }
            </Fragment>
        )
    }
}

registerPlugin( "contenttemplates-sidebar", {
    icon: "layout",
    render: ContentTemplatesSidebar
})